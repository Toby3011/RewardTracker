import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultDays = {
  Mo: true, Di: true, Mi: true, Do: true, Fr: true, Sa: false, So: false,
};

const TaskEditor = ({ onSave }) => {
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState('✅');
  const [reward, setReward] = useState(0.5);
  const [goal, setGoal] = useState(1);
  const [target, setTarget] = useState('');
  const [category, setCategory] = useState('');
  const [schedule, setSchedule] = useState(defaultDays);

  const handleToggleDay = (day) => {
    setSchedule({ ...schedule, [day]: !schedule[day] });
  };

  const handleSubmit = () => {
    const newTask = {
      id: uuidv4(),
      label,
      icon,
      reward: parseFloat(reward),
      goal: parseInt(goal),
      target,
      category,
      schedule
    };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    onSave();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Aufgabenname</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Icon (Emoji)</label>
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Reward (€)</label>
          <input
            type="number"
            step="0.1"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Zielwert</label>
          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Beschreibung (optional)</label>
        <input
          type="text"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="z.B. 30 Liegestütze"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Kategorie (optional)</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="z.B. Sport, Lernen"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Wochentage</label>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(defaultDays).map((day) => (
            <button
              key={day}
              onClick={() => handleToggleDay(day)}
              className={`px-2 py-1 rounded border ${
                schedule[day] ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Speichern
      </button>
    </div>
  );
};

export default TaskEditor;
