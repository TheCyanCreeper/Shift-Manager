import './CalendarCell.css'

export default function CalendarCell({ day_val, empty, shift, isTimeOff, isSelected, isSwapTarget, onClick }) {
    if (empty) {
        return <td className="calendar-cell empty"></td>;
    }

    let cellClass = "calendar-cell";
    if (shift) cellClass += " has-shift";
    if (isTimeOff) cellClass += " time-off";
    if (isSelected) cellClass += " selected";
    if (isSwapTarget) cellClass += " swap-target";

    return (
        <td className={cellClass} onClick={onClick}>
            <div className="cell-content">
                <span className="day-number">{day_val}</span>
                {shift && (
                    <div className="shift-info">
                        {shift.startTime} - {shift.endTime}
                    </div>
                )}
                {isTimeOff && (
                    <div className="time-off-indicator">
                        Time Off
                    </div>
                )}
                {isSwapTarget && !shift && !isTimeOff && (
                    <div className="swap-indicator">
                        🔄 Request
                    </div>
                )}
            </div>
        </td>
    );
}