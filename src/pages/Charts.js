// src/pages/ChartsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';

const ChartsPage = () => {
  const [data, setData] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDates = () => {
    const start = dayjs().startOf('week').add(weekOffset * 7, 'day');
    return [...Array(7)].map((_, i) => start.add(i, 'day'));
  };

  useEffect(() => {
    (async () => {
      const start = getWeekDates()[0].format('YYYY-MM-DD');
      const end = getWeekDates()[6].format('YYYY-MM-DD');
      const res = await axios.get(`/api/logs/summary?from=${start}&to=${end}`);
      setData(res.data);
    })();
  }, [weekOffset]);

  const labels = getWeekDates().map(d => d.format('dd D'));
  const rewards = labels.map((_, i) => data[i]?.total || 0);

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setWeekOffset(weekOffset - 1)}>&lt;</button>
        <div className="font-semibold">Woche ab {getWeekDates()[0].format('D.M.')}</div>
        <button onClick={() => setWeekOffset(weekOffset + 1)}>&gt;</button>
      </div>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Verdientes Budget (€)',
              data: rewards,
              backgroundColor: '#22c55e',
            }
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }}
      />
    </div>
  );
};

export default ChartsPage;
