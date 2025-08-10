import React from 'react';

export default function TaskCard({ task, completed, onProgress, onUndo, progressValue }) {
  return (
    <div
      className={`flex items-center justify-between p-4 mb-3 rounded-lg shadow-md transition-transform
        ${completed ? 'bg-green-100 border border-green-300 line-through text-green-800' : 'bg-white border border-gray-200'}
      `}
      style={{ transform: progressValue ? `scale(${1 + progressValue * 0.05})` : 'none' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{task.icon || '✅'}</span>
        <div>
          <h3 className="font-semibold text-lg">{task.label}</h3>
          {task.isGoalTask && (
            <p className="text-sm text-gray-600">
              {`Fortschritt: ${task.progress || 0} / ${task.goal}`}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {!completed ? (
          <>
            {task.isGoalTask ? (
              <span className="text-green-700 font-semibold">{((task.points * ((task.progress || 0) / task.goal)) || 0).toFixed(2)} €</span>
            ) : (
              <span className="text-green-700 font-semibold">{task.points.toFixed(2)} €</span>
            )}
          </>
        ) : (
          <button
            onClick={() => onUndo(task.id)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Rückgängig
          </button>
        )}
      </div>
    </div>
  );
}
