
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../LenghTracking.css'

interface HeadCircumferenceData {
  date: string;
  circumference: string; // Ändrad till string för att inkludera omkretsenheten (cm)
}

const HeadCircumference: React.FC = () => {
  const [circumferenceData, setCircumferenceData] = useState<HeadCircumferenceData[]>([]);
  const [date, setDate] = useState<string>('');
  const [circumference, setCircumference] = useState<string>(''); // Ändrad till string för att inkludera omkretsenheten (cm)
  const [chartKey, setChartKey] = useState<number>(0); // State to force re-render of the chart

  const chartRef = useRef<Chart | null>(null); // Ref to hold the chart instance

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

  const handleSaveCircumference = () => {
    if (!date || !circumference || !isValidCircumference(circumference)) { // Validera omkretsen innan du sparar
      alert('Please enter a valid positive circumference in cm');
      return;
    }

    const newCircumferenceData = [...circumferenceData, { date, circumference }];
    setCircumferenceData(newCircumferenceData);
    setDate('');
    setCircumference('');
    setChartKey(prevKey => prevKey + 1); // Trigger chart update
  };

  // Funktion för att validera omkretsen
  const isValidCircumference = (circ: string): boolean => {
    const regex = /^\d+(\.\d+)?cm$/; // Regex för att matcha numeriskt värde med cm-enhet
    return regex.test(circ);
  };

  const chartData = {
    labels: circumferenceData.map(data => data.date),
    datasets: [
      {
        label: 'Head Circumference',
        data: circumferenceData.map(data => parseFloat(data.circumference)), // Konvertera omkrets till numeriskt värde för diagramdata
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  useEffect(() => {
    // If the chart exists, destroy it before rendering a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Render the new chart
    if (circumferenceData.length > 0) {
      chartRef.current = new Chart(document.getElementById('circumferenceChart')!, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          }
        }
      });
    }

    // Return a cleanup function to destroy the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [circumferenceData, chartKey]); // Trigger re-render when circumferenceData or chartKey changes

  return (
    <div className="circumference-tracking-container">
      <h2>Track Head Circumference</h2>
      <div className="input-container">
        <label htmlFor="circumferenceDate">Date:</label>
        <input type="date" id="circumferenceDate" value={date} onChange={(e) => setDate(e.target.value)} />
        <label htmlFor="circumferenceValue">Head Circumference:</label>
        <input type="text" id="circumferenceValue" value={circumference} onChange={(e) => setCircumference(e.target.value)} />
      </div>
      <button className="save-button" onClick={handleSaveCircumference}>Save Head Circumference Information</button>
      <div>
        <h3>Head Circumference Information</h3>
        {/* Render the chart */}
        <canvas id="circumferenceChart"></canvas>
      </div>
    </div>
  );
};

export default HeadCircumference;
