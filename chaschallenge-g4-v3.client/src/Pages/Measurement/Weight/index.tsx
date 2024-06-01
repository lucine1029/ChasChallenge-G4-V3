

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton';
import '../Measurement.css';

Chart.register(annotationPlugin);

interface WeightData {
  week: number;
  weight: number;
}

interface StandardWeightData {
  week: number;
  minus1SD: number;
  normal: number;
  plus1SD: number;
}

const Weight: React.FC = () => {
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  const [week, setWeek] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [chartKey, setChartKey] = useState<number>(0);

  const chartRef = useRef<Chart<"line"> | null>(null);

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

  const standardWeightData: StandardWeightData[] = [
    { week: 0, minus1SD: 2.5, normal: 3.5, plus1SD: 4.5 },
    { week: 4, minus1SD: 3.9, normal: 5.1, plus1SD: 6.3 },
    { week: 8, minus1SD: 4.9, normal: 6.4, plus1SD: 7.9 },
    { week: 12, minus1SD: 5.7, normal: 7.4, plus1SD: 9.1 },
    { week: 16, minus1SD: 6.3, normal: 8.2, plus1SD: 10.1 },
    { week: 20, minus1SD: 6.8, normal: 8.9, plus1SD: 10.9 },
    { week: 24, minus1SD: 7.3, normal: 9.5, plus1SD: 11.7 },
    { week: 28, minus1SD: 7.7, normal: 10.1, plus1SD: 12.4 },
    { week: 32, minus1SD: 8.0, normal: 10.6, plus1SD: 13.0 },
    { week: 36, minus1SD: 8.3, normal: 11.0, plus1SD: 13.6 },
    { week: 40, minus1SD: 8.6, normal: 11.4, plus1SD: 14.1 },
    { week: 44, minus1SD: 8.8, normal: 11.8, plus1SD: 14.6 },
    { week: 48, minus1SD: 9.0, normal: 12.1, plus1SD: 15.0 },
    { week: 52, minus1SD: 9.2, normal: 12.4, plus1SD: 15.4 },
    { week: 56, minus1SD: 9.4, normal: 12.7, plus1SD: 15.7 },
    { week: 60, minus1SD: 9.6, normal: 13.0, plus1SD: 16.0 },
    { week: 64, minus1SD: 9.7, normal: 13.3, plus1SD: 16.3 },
    { week: 68, minus1SD: 9.9, normal: 13.5, plus1SD: 16.6 },
    { week: 72, minus1SD: 10.0, normal: 13.7, plus1SD: 16.9 },
    { week: 76, minus1SD: 10.2, normal: 13.9, plus1SD: 17.1 },
    { week: 80, minus1SD: 10.3, normal: 14.1, plus1SD: 17.4 },
    { week: 84, minus1SD: 10.4, normal: 14.3, plus1SD: 17.6 },
    { week: 88, minus1SD: 10.5, normal: 14.5, plus1SD: 17.9 },
    { week: 92, minus1SD: 10.6, normal: 14.7, plus1SD: 18.1 },
    { week: 96, minus1SD: 10.7, normal: 14.9, plus1SD: 18.3 },
    { week: 100, minus1SD: 10.8, normal: 15.1, plus1SD: 18.5 },
    { week: 104, minus1SD: 10.9, normal: 15.3, plus1SD: 18.7 },
  ];

  const isValidWeight = (wt: number): boolean => {
    return wt >= 0;
  };

  const handleSaveWeight = () => {
    const weekNumber = parseInt(week);
    if (isNaN(weekNumber) || weekNumber < 0 || weekNumber > 104 || !weight || !isValidWeight(parseFloat(weight))) {
      alert('Please enter a valid positive weight in kg and a valid week number between 0 and 104');
      return;
    }

    const newWeightData = [...weightData, { week: weekNumber, weight: parseFloat(weight) }];
    newWeightData.sort((a, b) => a.week - b.week);
    setWeightData(newWeightData);
    setWeek('');
    setWeight('');
    setChartKey(prevKey => prevKey + 1);
  };

  const userChartData = weightData.map(data => ({ x: data.week, y: parseFloat(data.weight.toFixed(1)) }));

  const getStandardData = (key: keyof StandardWeightData) => {
    return standardWeightData.map(data => ({ x: data.week, y: data[key] }));
  };

  const chartData = {
    labels: Array.from({ length: 105 }, (_, i) => i),
    datasets: [
      {
        label: 'User Weight',
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
        fill: '-1',
      },
      {
        label: 'Normal',
        data: getStandardData('normal'),
        borderColor: 'rgba(0, 255, 0, 1)',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: 'origin',
      },
      {
        label: '+1SD',
        data: getStandardData('plus1SD'),
        borderColor: 'rgba(192, 192, 192, 1)',
        backgroundColor: 'rgba(192, 192, 192, 0.1)',
        fill: '-1',
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(document.getElementById('weightChart') as HTMLCanvasElement, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Weight (kg)',
            },
            min: 0,
            max: 20,
          },
          x: {
            title: {
              display: true,
              text: 'Week',
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
                yValue: 10,
                content: ['-1SD'],
                color: 'gainsboro',
                position: 'end',
                font: {
                  size: 14,
                },
              },
              plus1SD: {
                type: 'label',
                xValue: 104,
                yValue: 17,
                content: ['+1SD'],
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

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [weightData, chartKey]);

  const handleWeekChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setWeek(isNaN(value) ? '' : Math.abs(value).toString());
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setWeight(isNaN(value) ? '' : Math.abs(value).toString());
  };

  return (
    <div className="measurement-tracking-container">
   <HeaderWithBackButton
  title={<h2 style={{ color: '#22a3d6', fontSize: '24px' }}>Viktkoll</h2>}
  customBackAction={undefined}
  isSettingsPage={undefined}
/>


      <div className="input-container">
        <label htmlFor="week">Week:</label>
        <input
          type="number"
          step="1"
          id="week"
          value={week}
          onChange={handleWeekChange}
          placeholder="Ange vecka (positivt heltal)"
        />
        <label htmlFor="weightValue">Weight:</label>
        <div className="weight-input">
          <input
            type="number"
            step="0.1"
            id="weightValue"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Ange vikt (positivt nummer)"
          />
          <span className="unit">kg</span>
        </div>
      </div>
      <button className="save-button" onClick={handleSaveWeight}>
        Save
      </button>
      <div className="chart-container">
        <canvas id="weightChart"></canvas>
      </div>
    </div>
  );
};

export default Weight;
