


import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import annotationPlugin from 'chartjs-plugin-annotation';
import '../Measurement.css'


Chart.register(annotationPlugin);

interface HeadCircumferenceData {
  week: number;
  circumference: string;
}

interface StandardHeadCircumferenceData {
  week: number;
  minus1SD: number;
  normal: number;
  plus1SD: number;
}

const HeadCircumference: React.FC = () => {
  const [headCircumferenceData, setHeadCircumferenceData] = useState<HeadCircumferenceData[]>([]);
  const [week, setWeek] = useState<string>('');
  const [circumference, setCircumference] = useState<string>('');
  const [chartKey, setChartKey] = useState<number>(0);

  const chartRef = useRef<Chart<"line"> | null>(null);

  const isValidCircumference = (circ: string): boolean => {
    const regex = /^\d+(\.\d+)?cm$/;
    return regex.test(circ);
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

  const standardHeadCircumferenceData: StandardHeadCircumferenceData[] = [
    { week: 0, minus1SD: 32.1, normal: 34.5, plus1SD: 36.9 },
    { week: 4, minus1SD: 35.0, normal: 37.3, plus1SD: 39.6 },
    { week: 8, minus1SD: 37.0, normal: 39.4, plus1SD: 41.7 },
    { week: 12, minus1SD: 38.5, normal: 41.0, plus1SD: 43.5 },
    { week: 16, minus1SD: 39.7, normal: 42.3, plus1SD: 44.9 },
    { week: 20, minus1SD: 40.7, normal: 43.4, plus1SD: 46.1 },
    { week: 24, minus1SD: 41.6, normal: 44.3, plus1SD: 47.0 },
    { week: 28, minus1SD: 42.4, normal: 45.2, plus1SD: 47.9 },
    { week: 32, minus1SD: 43.1, normal: 45.9, plus1SD: 48.7 },
    { week: 36, minus1SD: 43.8, normal: 46.6, plus1SD: 49.4 },
    { week: 40, minus1SD: 44.4, normal: 47.2, plus1SD: 50.0 },
    { week: 44, minus1SD: 44.9, normal: 47.7, plus1SD: 50.6 },
    { week: 48, minus1SD: 45.4, normal: 48.2, plus1SD: 51.1 },
    { week: 52, minus1SD: 45.8, normal: 48.6, plus1SD: 51.6 },
    { week: 56, minus1SD: 46.2, normal: 49.0, plus1SD: 52.0 },
    { week: 60, minus1SD: 46.6, normal: 49.4, plus1SD: 52.4 },
    { week: 64, minus1SD: 46.9, normal: 49.7, plus1SD: 52.8 },
    { week: 68, minus1SD: 47.2, normal: 50.0, plus1SD: 53.1 },
    { week: 72, minus1SD: 47.5, normal: 50.3, plus1SD: 53.4 },
    { week: 76, minus1SD: 47.8, normal: 50.6, plus1SD: 53.7 },
    { week: 80, minus1SD: 48.1, normal: 50.9, plus1SD: 54.0 },
    { week: 84, minus1SD: 48.3, normal: 51.1, plus1SD: 54.3 },
    { week: 88, minus1SD: 48.6, normal: 51.4, plus1SD: 54.5 },
    { week: 92, minus1SD: 48.8, normal: 51.6, plus1SD: 54.8 },
    { week: 96, minus1SD: 49.0, normal: 51.8, plus1SD: 55.0 },
    { week: 100, minus1SD: 49.2, normal: 52.0, plus1SD: 55.2 },
    { week: 104, minus1SD: 49.4, normal: 52.2, plus1SD: 55.4 },
  ];

  const handleSaveCircumference = () => {
    console.log("Current week:", week);
  console.log("Current circumference:", circumference);
    const weekNumber = parseInt(week);
    if (isNaN(weekNumber) || weekNumber < 0 || weekNumber > 104 || !circumference || !isValidCircumference(circumference)) {
      alert('Please enter a valid positive circumference in cm and a valid week number between 0 and 104');
      return;
    }

    const newHeadCircumferenceData = [...headCircumferenceData, { week: weekNumber, circumference }];
    console.log("New head circumference data:", newHeadCircumferenceData);
    newHeadCircumferenceData.sort((a, b) => a.week - b.week);
    setHeadCircumferenceData(newHeadCircumferenceData);
    setWeek('');
    setCircumference('');
    setChartKey(prevKey => prevKey + 1);
  };

  const userChartData = headCircumferenceData.map(data => ({ x: data.week, y: parseFloat(data.circumference) }));

  const getStandardData = (key: keyof StandardHeadCircumferenceData) => {
    return standardHeadCircumferenceData.map(data => ({ x: data.week, y: data[key] }));
  };

  const chartData = {
    labels: Array.from({ length: 105 }, (_, i) => i),
    datasets: [
      {
        label: 'User Head Circumference',
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
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('headCircumferenceChart') as HTMLCanvasElement;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Huvudomfång (cm)',
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
                yValue: 45,
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
                yValue: 54,
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
  }, [headCircumferenceData, chartKey]);

  return (
    <div className="measurement-tracking-container">
      <h2>Huvudomfång</h2>
      <div className="input-container">
        <label>Vecka:</label>
        <input type="number" value={week} onChange={e => setWeek(e.target.value)} />
        <label>Omkrets (cm):</label>
        <input type="text" value={circumference} onChange={e => setCircumference(e.target.value)} />
        <button className="save-button" onClick={handleSaveCircumference}>Save</button>
      </div>
      <div className="chart-container">
        <canvas id="headCircumferenceChart"></canvas>
      </div>
      <div className="data-list">
        {/* <h3>Spara Data</h3> */}
        <ul>
          {headCircumferenceData.map((data, index) => (
            <li key={index}>
              Vecka {data.week}: {data.circumference}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeadCircumference;



