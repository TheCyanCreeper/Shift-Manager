import './CalendarCell.css'
export default function CalendarCell(props) {
    return <td className="calendar-cell"><div className='day-content'>{props.day_val}</div></td>;
}