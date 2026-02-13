import './CalendarCell.css'

export default function CalendarCell({ day_val, empty, shift, isSelected, onClick }) {
    if (empty) {
        return <td className="calendar-cell empty"></td>;
    }

    let cellClass = "calendar-cell";
    if (shift) cellClass += " has-shift";
    if (isSelected) cellClass += " selected";

    return (
        <td className={cellClass} onClick={onClick}>
            <div className="cell-content">
                <span className="day-number">{day_val}</span>
                {shift && (
                    <div className="shift-info">
                        {shift.startTime} - {shift.endTime}
                    </div>
                )}
            </div>
        </td>
    );
}