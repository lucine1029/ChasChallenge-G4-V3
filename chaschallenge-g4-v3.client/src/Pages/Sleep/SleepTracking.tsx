import React, { useState, useEffect } from 'react';
import { FaBed } from 'react-icons/fa';
import './SleepTracking.scss';

interface SleepData {
  startTime: string;
  endTime: string;
  duration: number;
}

const SleepTracking: React.FC = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [sleepData, setSleepData] = useState<SleepData | null>(null);
  const [sleeping, setSleeping] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: any;

    if (sleeping) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 60000);
    }

    return () => clearInterval(interval);
  }, [sleeping]);

  const saveSleepDataToBackend = async (sleepData: SleepData) => {
    try {
      const response = await fetch('/saveSleepData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sleepData),
      });

      if (response.ok) {
        alert('Sleep data saved successfully!');
      } else {
        alert('Failed to save sleep data');
      }
    } catch (error) {
      console.error('Error saving sleep data:', error);
      alert('An error occurred while saving sleep data');
    }
  };

  const handleStartSleep = () => {
    const now = new Date();
    setStartTime(
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    setSleeping(true);
  };

  const handleEndSleep = () => {
    const now = new Date();
    setEndTime(
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    setSleeping(false);
  };

  const handleSubmit = async () => {
    if (!startTime || !endTime) {
      alert('Please enter both start and end time');
      return;
    }

    const duration = elapsedTime;
    const newSleepData: SleepData = { startTime, endTime, duration };

    await saveSleepDataToBackend(newSleepData);

    setSleepData(newSleepData);
    setStartTime('');
    setEndTime('');
    setElapsedTime(0);
  };

  return (
    <div className='sleep-tracking-container'>
      <h2>Spåra sömn</h2>

      <div className='button-container'>
        {!sleeping && (
          <button className='start-button' onClick={handleStartSleep}>
            <FaBed className='icon' />
            Start sleep
          </button>
        )}

        {sleeping && (
          <button className='end-button' onClick={handleEndSleep}>
            <FaBed className='icon' />
            End sleep
          </button>
        )}
      </div>

      <div className='input-container'>
        <label htmlFor='startTime'>Starttid:</label>
        <input
          type='time'
          id='startTime'
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          disabled={sleeping}
        />

        <label htmlFor='endTime'>Sluttid:</label>
        <input
          type='time'
          id='endTime'
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          disabled={sleeping}
        />
      </div>

      <button
        className='save-button'
        onClick={handleSubmit}
        disabled={sleeping}
      >
        Spara sömninformation
      </button>

      <div>
        <h3>Sömninformation</h3>
        {sleepData ? (
          <div>
            <p>Starttid: {sleepData.startTime}</p>
            <p>Sluttid: {sleepData.endTime}</p>
            <p>Antal minuter sovda: {sleepData.duration}</p>
          </div>
        ) : (
          <p>Barnet har sovit i {elapsedTime} minuter.</p>
        )}
      </div>
    </div>
  );
};

export default SleepTracking;
