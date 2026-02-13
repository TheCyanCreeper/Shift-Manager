import { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import Card from '../UI/Card';
import './MainContent.css';
import schedule1 from '../../data/schedule1.json';
import schedule2 from '../../data/schedule2.json';
import schedule3 from '../../data/schedule3.json';

const SCHEDULES = {
  'Schedule 1': schedule1,
  'Schedule 2': schedule2,
  'Schedule 3': schedule3
};

export default function MainContent() {
  const [activeScheduleName, setActiveScheduleName] = useState('Schedule 1');
  const [selectedDate, setSelectedDate] = useState(null);

  const activeSchedule = SCHEDULES[activeScheduleName];

  const selectedShift = activeSchedule.find(shift => shift.date === selectedDate);

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="main-container">
      <div className="schedule-controls">
        {Object.keys(SCHEDULES).map((name) => (
          <button
            key={name}
            onClick={() => {
                setActiveScheduleName(name);
                setSelectedDate(null);
            }}
            className={activeScheduleName === name ? 'active' : ''}
          >
            {name}
          </button>
        ))}
      </div>

      <Card className="main">
        <Calendar 
          schedule={activeSchedule} 
          onDayClick={handleDayClick}
          selectedDate={selectedDate}
        />
      </Card>

      <Card className="details-card">
        <h3>Shift Details</h3>
        {selectedDate ? (
            <div className="details-content">
                <p><strong>Date:</strong> {selectedDate}</p>
                {selectedShift ? (
                    <>
                        <p><strong>Position:</strong> {selectedShift.position}</p>
                        <p><strong>Time:</strong> {selectedShift.startTime} - {selectedShift.endTime}</p>
                    </>
                ) : (
                    <p>No shift scheduled for this day.</p>
                )}
            </div>
        ) : (
            <p>Select a day to view details.</p>
        )}
      </Card>
    </div>
  );
}