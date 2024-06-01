

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
import '../Measurement.css';

interface LengthData {
  week: number;
  length: string;
}

interface StandardLengthData {
  week: number;
  minus1SD: number;
  normal: number;
  plus1SD: number;
}

const Length: React.FC = () => {
  const [lengthData, setLengthData] = useState<LengthData[]>([]);
  const [week, setWeek] = useState<string>('');
  const [length, setLength] = useState<string>('');

  const chartRef = useRef<Chart<"line"> | null>(null);

  const isValidLength = (len: string): boolean => {
    const regex = /^\d+(\.\d+)?cm$/;
    return regex.test(len);
  };

  useEffect(() => {
    return () => {
      destroyChart();
    };
  }, []);

  const destroyChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  };

  const standardLengthData: StandardLengthData[] = [
    { week: 0, minus1SD: 45, normal: 49, plus1SD: 53 },
    { week: 4, minus1SD: 50.5, normal: 53.5, plus1SD: 56.5 },
    { week: 8, minus1SD: 53.5, normal: 56.5, plus1SD: 59.5 },
    { week: 12, minus1SD: 56, normal: 59, plus1SD: 62 },
    { week: 16, minus1SD: 58, normal: 61, plus1SD: 64 },
    { week: 20, minus1SD: 60, normal: 63, plus1SD: 66 },
    { week: 24, minus1SD: 62, normal: 65, plus1SD: 68 },
    { week: 28, minus1SD: 64, normal: 67, plus1SD: 70 },
    { week: 32, minus1SD: 66, normal: 69, plus1SD: 72 },
    { week: 36, minus1SD: 68, normal: 71, plus1SD: 74 },
    { week: 40, minus1SD: 70, normal: 73, plus1SD: 76 },
    { week: 44, minus1SD: 72, normal: 75, plus1SD: 78 },
    { week: 48, minus1SD: 73, normal: 76, plus1SD: 79 },
    { week: 52, minus1SD: 74, normal: 77, plus1SD: 80 },
    { week: 56, minus1SD: 75, normal: 78, plus1SD: 81 },
    { week: 60, minus1SD: 76, normal: 79, plus1SD: 82 },
    { week: 64, minus1SD: 77, normal: 80, plus1SD: 83 },
    { week: 68, minus1SD: 78, normal: 81, plus1SD: 84 },
    { week: 72, minus1SD: 79, normal: 82, plus1SD: 85 },
    { week: 76, minus1SD: 80, normal: 83, plus1SD: 86 },
    { week: 80, minus1SD: 81, normal: 84, plus1SD: 87 },
    { week: 84, minus1SD: 82, normal: 85, plus1SD: 88 },
    { week: 88, minus1SD: 83, normal: 86, plus1SD: 89 },
    { week: 92, minus1SD: 84, normal: 87, plus1SD: 90 },
    { week: 96, minus1SD: 85, normal: 88, plus1SD: 91 },
    { week: 100, minus1SD: 86, normal: 89, plus1SD: 92 },
    { week: 104, minus1SD: 87, normal: 90, plus1SD: 93 },
  ];

  const handleSaveLength = () => {
    const weekNumber = parseInt(week);
    if (isNaN(weekNumber) || weekNumber < 0 || weekNumber > 104 || !length || !isValidLength(length)) {
      alert('Please enter a valid positive length in cm and a valid week number between 0 and 104');
      return;
    }

    const newLengthData = [...lengthData, { week: weekNumber, length }];
    newLengthData.sort((a, b) => a.week - b.week);
    setLengthData(newLengthData);
    setWeek('');
    setLength('');
    updateChart();
  };

  const userChartData = lengthData.map(data => ({ x: data.week, y: parseFloat(data.length) }));

  const getStandardData = (key: keyof StandardLengthData) => {
    return standardLengthData.map(data => ({ x: data.week, y: data[key] }));
  };

  const updateChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('lengthChart') as HTMLCanvasElement;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 105 }, (_, i) => i),
        datasets: [
          {
            label: 'User Length',
            data: userChartData,
            fill: false,
            borderColor: 'black',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            tension: 0.1,
            pointRadius: 6,
            pointBackgroundColor: 'black',
          },
          {
            label: '-1SD',
            data: getStandardData('minus1SD'),
            borderColor: 'rgba(192, 192, 192, 1)',
            backgroundColor: 'rgba(192, 192, 192, 0.1)',
            fill: false,
          },
          {
            label: 'Normal',
            data: getStandardData('normal'),
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            fill: false,
          },
          {
            label: '+1SD',
            data: getStandardData('plus1SD'),
            borderColor: 'rgba(192, 192, 192, 1)',
            backgroundColor: 'rgba(192, 192, 192, 0.1)',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Längd (cm)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Vecka',
            },
            ticks: {
              stepSize: 4,
            },
          },
        },
        plugins: {
          annotation: {
            annotations: {
              minus1SD: {
                type: 'label',
                xValue: 104,
                yValue: 79,
                content: '-1SD',
                color: 'gainsboro',
                position: 'end',
                font: {
                  size: 12,
                },
              },
              plus1SD: {
                type: 'label',
                xValue: 104,
                yValue: 89,
                content: '+1SD',
                color: 'gainsboro',
                position: 'end',
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    updateChart();
  }, [lengthData]);

  return (

    <div className="measurement-tracking-container">
    <HeaderWithBackButton
   title={<h2 style={{ color: '#22a3d6', fontSize: '24px' }}>Längdkurva</h2>}
   customBackAction={undefined}
   isSettingsPage={undefined}
 />
    
      {/* <div className="input-container">
        <label>Vecka:</label>
        <input type="number" value={week} onChange={e => setWeek(e.target.value)} />
        <label>Längd (cm):</label>
        <input type="text" value={length} onChange={e => setLength(e.target.value)} />
        <button className="save-button" onClick={handleSaveLength}>Save</button>
      </div> */}
       <div className="input-container">
  <label>Vecka:</label>
  <input
    type="number"
    value={week}
    onChange={e => setWeek(e.target.value)}
    placeholder="Ange vecka (positivt heltal)"
  />
  <label>Längd (cm):</label>
  <input
    type="text"
    value={length}
    onChange={e => setLength(e.target.value)}
    placeholder="Ange längd (positivt nummer)"
  />
  <button className="save-button" onClick={handleSaveLength}>Save</button>
</div>

      <div className="chart-container">
        <canvas id="lengthChart"></canvas>
      </div>
      <div className="data-list">
        <ul>
          {lengthData.map((data, index) => (
            <li key={index}>
              Vecka {data.week}: {data.length}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Length;
