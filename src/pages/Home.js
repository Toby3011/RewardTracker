// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import {
  fetchTasks as apiFetchTasks,
  fetchLogs as apiFetchLogs,
  upsertLog as apiUpsertLog
} from '../api';
import TaskEditor from '../components/TaskEditor';
import { useSwipeable } from 'react-swipeable';
import dayjs from 'dayjs';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [log, setLog] = useState({});
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [showEditor, setShowEditor] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    fetchTasks();
    fetchLog();
  }, [selectedDay]);

  const fetchTasks = async () => {
    const data = await apiFetchTasks();
    setTasks(data);
  };

  const fetchLog = async () => {
    const data = await apiFetchLogs(selectedDay);
    setLog(data || {});
  };

  const saveProgress = async (taskId, progress) => {
    const updated = { ...log, [taskId]: { progress } };
    setLog(updated);
    await apiUpsertLog({
      date: selectedDay,
      taskId,
      progress,
    });
  };

  const handleSwipe = (taskId, delta) => {
    const old = log[taskId]?.progress || 0;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const newProgress = Math.max(0, Math.min(task.goal || 1, old + delta));
    saveProgress(taskId, newProgress);
  };

  const handlers = taskId => useSwipeable({
    onSwipedLeft: (e) => handleSwipe(taskId, -Math.ceil(Math.abs(e.deltaX) / 30)),
    onSwipedRight: (e) => handleSwipe(taskId, Math.ceil(e.deltaX / 30)),
    trackMouse: true,
  });

  const renderWeekSelector = () => {
    const startOfWeek = dayjs().startOf('week').add(weekOffset * 7, 'day');
    return (
      <div className="flex items-center justify-center mb-4 gap-4">
        <button onClick={() => setWeekOffset(weekOffset - 1)}>&lt;</button>
        {[...Array(7)].map((_, i) => {
          const date = startOfWeek.add(i, 'day');
          const isSelected = date.format('YYYY-MM-DD') === selectedDay;
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(date.format('YYYY-MM-DD'))}
              className={`px-2 py-1 rounded ${isSelected ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
            >
              {date.format('dd D')}
            </button>
          );
        })}
        <button onClick={() => setWeekOffset(weekOffset + 1)}>&gt;</button>
      </div>
    );
  };

  const total = tasks.reduce((sum, task) => {
    const prog = log[task.id]?.progress || 0;
    const reward = task.reward || 0;
    const goal = task.goal || 1;
    return sum + Math.min(prog / goal, 1) * reward;
  }, 0);

  const [done, todo] = tasks.reduce(
    ([d, t], task) => {
      const progress = log[task.id]?.progress || 0;
      const goal = task.goal || 1;
      return progress >= goal ? [[...d, task], t] : [d, [...t, task]];
    },
    [[], []]
  );

  return (
    <div className="p-4 pb-24">
      <div className="text-center font-bold text-lg mb-2">Gesamt: {total.toFixed(2)} €</div>
      {renderWeekSelector()}

      {[...todo, ...done].map((task, idx) => {
        const value = log[task.id]?.progress || 0;
        const goal = task.goal || 1;
        const reward = task.reward || 0;
        const percent = Math.min(100, (value / goal) * 100);
        const bgColor = percent >= 100 ? 'bg-green-200' : percent >= 50 ? 'bg-green-100' : 'bg-gray-50';

        return (
          <div
            key={task.id}
            {...handlers(task.id)}
            className={`p-4 mb-3 rounded shadow ${bgColor}`}
          >
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="text-xl">{task.icon}</div>
                <div>
                  <div className="font-bold">{task.label}</div>
                  <div className="text-xs text-gray-600">
                    {value}/{goal} ({((value / goal) * reward).toFixed(2)} €)
                  </div>
                </div>
              </div>
              <div className="text-xs">{percent.toFixed(0)}%</div>
            </div>
            <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}

      <button
        onClick={() => setShowEditor(true)}
        className="fixed bottom-20 right-6 bg-green-600 text-white w-14 h-14 text-3xl rounded-full shadow-lg"
      >
        +
      </button>

      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded w-80">
            <TaskEditor onClose={() => setShowEditor(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
