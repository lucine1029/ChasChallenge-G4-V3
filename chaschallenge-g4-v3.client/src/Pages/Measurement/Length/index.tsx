/* 

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import '../LenghTracking.css';

interface LengthData {
  week: number; // Ändrat till number
  length: string; // Behåller string för att inkludera längdenheten (cm)
}

interface StandardLengthData {
  week: number; // Ändrat till number
  minus1SD: number;
  normal: number;
  plus1SD: number;
}

const Length: React.FC = () => {
  const [lengthData, setLengthData] = useState<LengthData[]>([]);
  const [week, setWeek] = useState<string>(''); // Veckonummer som string för input
  const [length, setLength] = useState<string>(''); // Ändrad till string för att inkludera längdenheten (cm)
  const [chartKey, setChartKey] = useState<number>(0); // State to force re-render of the chart

  const chartRef = useRef<Chart<"line"> | null>(null); // Ref to hold the chart instance

  // Funktion för att validera längden
  const isValidLength = (len: string): boolean => {
    const regex = /^\d+(\.\d+)?cm$/; // Regex för att matcha numeriskt värde med cm-enhet
    return regex.test(len);
  };

  useEffect(() => {
    return () => {
      // Clean up on unmount to avoid memory leaks
      destroyChart();
    };
  }, []); // Empty dependency array to run only once on mount

  const destroyChart = () => {
    // Destroy the chart when component unmounts
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  };

  const standardLengthData: StandardLengthData[] = [
    { week: 0, minus1SD: 45, normal: 49, plus1SD: 53 },
    { week: 1, minus1SD: 46.5, normal: 50.5, plus1SD: 54 },
    { week: 2, minus1SD: 48, normal: 51.5, plus1SD: 55 },
    { week: 3, minus1SD: 48.5, normal: 52.5, plus1SD: 55.5 },
    { week: 4, minus1SD: 50.5, normal: 53.5, plus1SD: 57 },
    { week: 5, minus1SD: 50.5, normal: 54.5, plus1SD: 58.2 },
    { week: 6, minus1SD: 51, normal: 55, plus1SD: 59 },
    { week: 7, minus1SD: 52, normal: 56, plus1SD: 60 },
    { week: 8, minus1SD: 53.5, normal: 56.5, plus1SD: 60.5 },
    { week: 13, minus1SD: 56.5, normal: 61, plus1SD: 65.5 },
    { week: 26, minus1SD: 61, normal: 66, plus1SD: 71 },
    { week: 36, minus1SD: 65.5, normal: 70, plus1SD: 75 },
    { week: 52, minus1SD: 70, normal: 76, plus1SD: 82 },
    { week: 78, minus1SD: 75, normal: 81, plus1SD: 87 },
    { week: 104, minus1SD: 80, normal: 86, plus1SD: 93 },
  ];

  const handleSaveLength = () => {
    const weekNumber = parseInt(week);
    if (isNaN(weekNumber) || weekNumber < 0 || weekNumber > 104 || !length || !isValidLength(length)) { // Validera längden innan du sparar
      alert('Please enter a valid positive length in cm and a valid week number between 0 and 104');
      return;
    }

    const newLengthData = [...lengthData, { week: weekNumber, length }];
    newLengthData.sort((a, b) => a.week - b.week); // Sortera längddata efter vecka
    setLengthData(newLengthData);
    setWeek('');
    setLength('');
    setChartKey(prevKey => prevKey + 1); // Trigger chart update
  };

  const userChartData = lengthData.map(data => ({ x: data.week, y: parseFloat(data.length) }));

  const getStandardData = (key: keyof StandardLengthData) => {
    return standardLengthData.map(data => ({ x: data.week, y: data[key] }));
  };

  const chartData = {
    labels: Array.from({ length: 105 }, (_, i) => i), // Skapa en array med veckor från 0 till 104
    datasets: [
      {
        label: 'User Length',
        data: userChartData,
        fill: false,
        borderColor: 'black',
        tension: 0.1,
        pointRadius: 10
      },
      { label: '-1SD', data: getStandardData('minus1SD'), borderColor: 'blue', fill: false },
      { label: 'Normal', data: getStandardData('normal'), borderColor: 'green', fill: false },
      { label: '+1SD', data: getStandardData('plus1SD'), borderColor: 'red', fill: false },
    ],
  };

  useEffect(() => {
    // If the chart exists, destroy it before rendering a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Render the new chart
    chartRef.current = new Chart(document.getElementById('lengthChart') as HTMLCanvasElement, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Length (cm)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Week'
            },
            ticks: {
              stepSize: 1 // Visa varje vecka
            }
          }
        }
      }
    });

    // Return a cleanup function to destroy the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [lengthData, chartKey]); // Trigger re-render when lengthData or chartKey changes

  return (
    <div className="measurement-tracking-container">
      <h2>Track Length</h2>
      <div className="input-container">
        <label htmlFor="week">Week:</label>
        <input type="number" id="week" value={week} onChange={(e) => setWeek(e.target.value)} />
        <label htmlFor="lengthValue">Length:</label>
        <input type="text" id="lengthValue" value={length} onChange={(e) => setLength(e.target.value)} />
        <button onClick={handleSaveLength}>Save</button>
      </div>
      <div className="chart-container">
        <canvas id="lengthChart"></canvas>
      </div>
    </div>
  );
};

export default Length;
 */


import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import '../LenghTracking.css';

interface LengthData {
  week: number; // Ändrat till number
  length: string; // Behåller string för att inkludera längdenheten (cm)
}

interface StandardLengthData {
  week: number; // Ändrat till number
  minus1SD: number;
  normal: number;
  plus1SD: number;
}

const Height: React.FC = () => {
  const [lengthData, setLengthData] = useState<LengthData[]>([]);
  const [week, setWeek] = useState<string>(''); // Veckonummer som string för input
  const [length, setLength] = useState<string>(''); // Ändrad till string för att inkludera längdenheten (cm)
  const [chartKey, setChartKey] = useState<number>(0); // State to force re-render of the chart

  const chartRef = useRef<Chart<"line"> | null>(null); // Ref to hold the chart instance

  // Funktion för att validera längden
  const isValidLength = (len: string): boolean => {
    const regex = /^\d+(\.\d+)?cm$/; // Regex för att matcha numeriskt värde med cm-enhet
    return regex.test(len);
  };

  useEffect(() => {
    return () => {
      // Clean up on unmount to avoid memory leaks
      destroyChart();
    };
  }, []); // Empty dependency array to run only once on mount

  const destroyChart = () => {
    // Destroy the chart when component unmounts
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  };

  const standardLengthData: StandardLengthData[] = [
    { week: 0, minus1SD: 45, normal: 49, plus1SD: 53 },
    { week: 1, minus1SD: 46.5, normal: 50.5, plus1SD: 54 },
    { week: 2, minus1SD: 48, normal: 51.5, plus1SD: 55 },
    { week: 3, minus1SD: 48.5, normal: 52.5, plus1SD: 55.5 },
    { week: 4, minus1SD: 50.5, normal: 53.5, plus1SD: 57 },
    { week: 5, minus1SD: 50.5, normal: 54.5, plus1SD: 58.2 },
    { week: 6, minus1SD: 51, normal: 55, plus1SD: 59 },
    { week: 7, minus1SD: 52, normal: 56, plus1SD: 60 },
    { week: 8, minus1SD: 53.5, normal: 56.5, plus1SD: 60.5 },
    { week: 13, minus1SD: 56.5, normal: 61, plus1SD: 65.5 },
    { week: 26, minus1SD: 61, normal: 66, plus1SD: 71 },
    { week: 36, minus1SD: 65.5, normal: 70, plus1SD: 75 },
    { week: 52, minus1SD: 70, normal: 76, plus1SD: 82 },
    { week: 78, minus1SD: 75, normal: 81, plus1SD: 87 },
    { week: 104, minus1SD: 80, normal: 86, plus1SD: 93 },
  ];

  const handleSaveLength = () => {
    const weekNumber = parseInt(week);
    if (isNaN(weekNumber) || weekNumber < 0 || weekNumber > 104 || !length || !isValidLength(length)) { // Validera längden innan du sparar
      alert('Please enter a valid positive length in cm and a valid week number between 0 and 104');
      return;
    }

    const newLengthData = [...lengthData, { week: weekNumber, length }];
    newLengthData.sort((a, b) => a.week - b.week); // Sortera längddata efter vecka
    setLengthData(newLengthData);
    setWeek('');
    setLength('');
    setChartKey(prevKey => prevKey + 1); // Trigger chart update
  };

  const userChartData = lengthData.map(data => ({ x: data.week, y: parseFloat(data.length) }));

  const getStandardData = (key: keyof StandardLengthData) => {
    return standardLengthData.map(data => ({ x: data.week, y: data[key] }));
  };

  const chartData = {
    labels: Array.from({ length: 105 }, (_, i) => i), // Skapa en array med veckor från 0 till 104
    datasets: [
      {
        label: 'User Length',
        data: userChartData,
        fill: false,
        borderColor: 'black',
        tension: 0.1,
        pointRadius: 10
      },
      { label: '-1SD', data: getStandardData('minus1SD'), borderColor: 'blue', fill: false },
      { label: 'Normal', data: getStandardData('normal'), borderColor: 'green', fill: false },
      { label: '+1SD', data: getStandardData('plus1SD'), borderColor: 'red', fill: false },
    ],
  };

  useEffect(() => {
    // If the chart exists, destroy it before rendering a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Render the new chart
    chartRef.current = new Chart(document.getElementById('lengthChart') as HTMLCanvasElement, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Length (cm)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Week'
            },
            ticks: {
              stepSize: 1 // Visa varje vecka
            }
          }
        }
      }
    });

    // Return a cleanup function to destroy the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [lengthData, chartKey]); // Trigger re-render when lengthData or chartKey changes

  return (
    <div className="measurement-tracking-container">
      <h2>Track Length</h2>
      <div className="input-container">
        <label htmlFor="week">Week:</label>
        <input type="number" id="week" value={week} onChange={(e) => setWeek(e.target.value)} />
        <label htmlFor="lengthValue">Length:</label>
        <input type="text" id="lengthValue" value={length} onChange={(e) => setLength(e.target.value)} />
        <button onClick={handleSaveLength}>Save</button>
      </div>
      <div className="chart-container">
        <canvas id="lengthChart"></canvas>
      </div>
    </div>
  );
};

export default Height;
