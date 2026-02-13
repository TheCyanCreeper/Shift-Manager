import Card from "../UI/Card";
import CalendarCell from "./CalendarCell";
import './Calendar.css';

export default function Calendar({ schedule, onDayClick, selectedDate }) {
    const curr_month = 1;
    const curr_year = 2026;

    const displayDate = new Date(curr_year, curr_month, 1);
    
    const first_day_of_month = new Date(curr_year, curr_month, 1);
    const first_day_index = first_day_of_month.getDay();
    const days_in_month = new Date(curr_year, curr_month + 1, 0).getDate();

    const calendar_cells = [];
    
    for (let i = 0; i < first_day_index; i++) {
        calendar_cells.push(<CalendarCell key={`empty-${i}`} empty={true} />);
    }

    for (let day = 1; day <= days_in_month; day++) {
        const dateString = `${curr_year}-${String(curr_month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const shift = schedule.find(s => s.date === dateString);
        const isSelected = selectedDate === dateString;

        calendar_cells.push(
            <CalendarCell 
                key={day} 
                day_val={day}
                shift={shift} 
                isSelected={isSelected}
                onClick={() => onDayClick(dateString)}
            />
        );
    }

    const total_slots = Math.ceil(calendar_cells.length / 7) * 7;
    const remaining_slots = total_slots - calendar_cells.length;
    for (let i = 0; i < remaining_slots; i++) {
        calendar_cells.push(<CalendarCell key={`empty-end-${i}`} empty={true} />);
    }

    const rows = [];
    for (let i = 0; i < calendar_cells.length; i += 7) {
        rows.push(<tr key={i}>{calendar_cells.slice(i, i + 7)}</tr>);
    }

    return (
        <div className="calendar">
            <h3 className="calendar-month">
                {displayDate.toLocaleDateString('en-US', { month: "long", year: "numeric" })}
            </h3>
            <table className="calendar-days">
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}