import React from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeableTaskCard = ({ task, progress, goal, reward, target, onSwipe }) => {
  const percent = Math.min(100, Math.round((progress / goal) * 100));

  const bgClass =
    percent >= 100 ? 'bg-green-100' :
    percent >= 50 ? 'bg-green-50' :
    'bg-white';

  const handlers = useSwipeable({
    onSwipedLeft: (e) => onSwipe(-Math.max(1, Math.round(Math.abs(e.deltaX) / 40))),
    onSwipedRight: (e) => onSwipe(Math.max(1, Math.round(e.deltaX / 40))),
    trackMouse: true
  });

  return (
    <div {...handlers} className={`p-4 rounded-xl shadow ${bgClass} transition-all`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="text-2xl">{task.icon}</span>
          <div>
            <div className="font-semibold">{task.label}</div>
            <div className="text-xs text-gray-600">
              {progress}/{goal} ({((progress / goal) * reward).toFixed(2)} €)
            </div>
            {target && <div className="text-xs italic text-gray-400">Ziel: {target}</div>}
          </div>
        </div>
        <span className="text-xs text-gray-500">{percent}%</span>
      </div>
      <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SwipeableTaskCard;
