import { useState, useEffect } from 'react';
import Calendar from '../Calendar/Calendar';
import Card from '../UI/Card';
import './MainContent.css';
import scheduleData1 from '../../data/schedule1.json';
import scheduleData2 from '../../data/schedule2.json';
import scheduleData3 from '../../data/schedule3.json';

const RAW_SCHEDULES = [scheduleData1, scheduleData2, scheduleData3];

export default function MainContent() {
  const [employees, setEmployees] = useState([]);
  const [activeEmployeeIndex, setActiveEmployeeIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [swapRequests, setSwapRequests] = useState([]);
  const [showSwapModal, setShowSwapModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const initializedEmployees = RAW_SCHEDULES.map((data, index) => {
        // Process Shifts
        const shiftsWithDates = data.shifts
            .filter(s => s.day <= 28)
            .map(shift => {
                const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(shift.day).padStart(2, '0')}`;
                return { ...shift, date: dateString };
            });

        // Process Time Offs
        const timeOffsWithDates = (data.timeOffRequests || [])
            .filter(day => day <= 28)
            .map(day => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        
        return {
            id: index,
            name: data.employeeName,
            shifts: shiftsWithDates,
            timeOffs: timeOffsWithDates
        };
    });

    setEmployees(initializedEmployees);
  }, []);

  if (employees.length === 0) return <div>Loading...</div>;

  const activeEmployee = employees[activeEmployeeIndex];
  const selectedShift = activeEmployee.shifts.find(shift => shift.date === selectedDate);
  const isTimeOff = activeEmployee.timeOffs.includes(selectedDate);
  
  // Find specific request for the SELECTED date
  const incomingSwap = swapRequests.find(req => 
      req.toId === activeEmployee.id && 
      req.date === selectedDate && 
      req.status === 'pending'
  );

  // Find ALL pending dates to show indicators on Calendar
  const pendingSwapDates = swapRequests
      .filter(req => req.toId === activeEmployee.id && req.status === 'pending')
      .map(req => req.date);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowSwapModal(false);
  };

  const handleProposeSwap = () => {
    setShowSwapModal(true);
  };

  const submitSwapRequest = (targetEmployeeId) => {
    const newRequest = {
        id: Date.now(),
        fromId: activeEmployee.id,
        fromName: activeEmployee.name,
        toId: targetEmployeeId,
        date: selectedDate,
        shift: selectedShift,
        status: 'pending'
    };
    setSwapRequests([...swapRequests, newRequest]);
    setShowSwapModal(false);
    alert("Swap request sent!");
  };

  const handleAcceptSwap = () => {
    if (!incomingSwap) return;

    const updatedEmployees = [...employees];
    
    // Remove shift from Sender
    const sender = updatedEmployees.find(e => e.id === incomingSwap.fromId);
    sender.shifts = sender.shifts.filter(s => s.date !== incomingSwap.date);

    // Add shift to Receiver (Current Active)
    const receiver = updatedEmployees.find(e => e.id === activeEmployee.id);
    receiver.shifts.push(incomingSwap.shift);

    setEmployees(updatedEmployees);
    setSwapRequests(swapRequests.filter(r => r.id !== incomingSwap.id));
    setSelectedDate(null); 
  };

  return (
    <div className="main-container">
      <div className="schedule-controls">
        {employees.map((emp, index) => (
          <button
            key={emp.id}
            onClick={() => {
                setActiveEmployeeIndex(index);
                setSelectedDate(null);
                setShowSwapModal(false);
            }}
            className={activeEmployeeIndex === index ? 'active' : ''}
          >
            {emp.name}
          </button>
        ))}
      </div>

      <div className="content-row">
        <Card className="main">
          <Calendar 
            schedule={activeEmployee.shifts} 
            timeOffs={activeEmployee.timeOffs}
            onDayClick={handleDayClick}
            selectedDate={selectedDate}
            pendingSwapDates={pendingSwapDates}
          />
        </Card>

        <Card className="details-card">
          <h3>Shift Details</h3>
          {selectedDate ? (
              <div className="details-content">
                  <p className="detail-date">
                    {new Date(selectedDate).toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric'})}
                  </p>
                  
                  {isTimeOff ? (
                      <div className="time-off-notice">
                          <span className="icon">🏖️</span> Requested Time Off
                      </div>
                  ) : null}

                  {selectedShift ? (
                      <>
                          <div className="detail-item">
                            <span className="label">Position:</span>
                            <span className="value">{selectedShift.position}</span>
                          </div>
                          <div className="detail-item">
                            <span className="label">Time:</span>
                            <span className="value">{selectedShift.startTime} - {selectedShift.endTime}</span>
                          </div>
                          
                          {!showSwapModal && !incomingSwap && (
                              <button className="action-btn" onClick={handleProposeSwap}>
                                  Propose Swap
                              </button>
                          )}

                          {showSwapModal && (
                              <div className="swap-modal">
                                  <p>Swap with:</p>
                                  {employees.filter(e => e.id !== activeEmployee.id).map(emp => (
                                      <button 
                                        key={emp.id} 
                                        className="swap-target-btn"
                                        onClick={() => submitSwapRequest(emp.id)}
                                      >
                                          {emp.name}
                                      </button>
                                  ))}
                              </div>
                          )}
                      </>
                  ) : (
                      <>
                        {incomingSwap ? (
                            <div className="incoming-swap-alert">
                                <h4>🔄 Swap Request</h4>
                                <p><strong>From:</strong> {incomingSwap.fromName}</p>
                                <p><strong>Position:</strong> {incomingSwap.shift.position}</p>
                                <p><strong>Time:</strong> {incomingSwap.shift.startTime} - {incomingSwap.shift.endTime}</p>
                                <button className="accept-btn" onClick={handleAcceptSwap}>
                                    Accept Shift
                                </button>
                            </div>
                        ) : (
                            !isTimeOff && <p className="no-shift">No shift scheduled.</p>
                        )}
                      </>
                  )}
              </div>
          ) : (
              <p className="placeholder-text">Select a day on the calendar to view details.</p>
          )}
        </Card>
      </div>
    </div>
  );
}