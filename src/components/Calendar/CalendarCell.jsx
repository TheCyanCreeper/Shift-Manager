import './CalendarCell.css'

export default function CalendarCell({ day_val, empty, hasShift, isSelected, onClick }) {
    if (empty) {
        return <td className="calendar-cell empty"></td>;
    }

    let cellClass = "calendar-cell";
    if (hasShift) cellClass += " has-shift";
    if (isSelected) cellClass += " selected";

    return (
        <td className={cellClass} onClick={onClick}>
            <div className='day-content'>
                {day_val}
                {hasShift && <div className="shift-dot"></div>}
            </div>
        </td>
    );
}