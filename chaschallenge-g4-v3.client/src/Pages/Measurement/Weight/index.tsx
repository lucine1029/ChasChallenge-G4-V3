import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../Measurment.css'

interface WeightData {
  date: string;
  weight: string; // Ändrad till string för att inkludera viktenheten (kg)
}

const Weight: React.FC = () => {
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  const [date, setDate] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const chartRef = useRef<Chart | null>(null);

  const handleSaveWeight = () => {
    if (!date || !weight || !isValidWeight(weight)) {
      alert('Please enter a valid positive weight in kg');
      return;
    }

    const newWeightData = [...weightData, { date, weight }];
    setWeightData(newWeightData);
    setDate('');
    setWeight('');
  };

  const isValidWeight = (wt: string): boolean => {
    const regex = /^\d+(\.\d+)?kg$/;
    return regex.test(wt);
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('weightChart') as HTMLCanvasElement;
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: weightData.map(data => data.date),
          datasets: [{
            label: 'Weight (kg)',
            data: weightData.map(data => parseFloat(data.weight)),
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }]
        },
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

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [weightData]);

  return (
    <div className="measurement-tracking-container">
      <h2>Track Weight</h2>
      <div className="input-container">
        <label htmlFor="weightDate">Date:</label>
        <input type="date" id="weightDate" value={date} onChange={(e) => setDate(e.target.value)} />
        <label htmlFor="measurementWeight">Weight:</label>
        <input type="text" id="measurementWeight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <button className="save-button" onClick={handleSaveWeight}>Save Weight Information</button>
      </div>
      <div>
        <h3>Weight Information</h3>
        <canvas id="weightChart"></canvas>
      </div>
    </div>
  );
};

export default Weight;


