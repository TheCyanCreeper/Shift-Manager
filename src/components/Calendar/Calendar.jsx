import Card from "../UI/Card";
import CalendarCell from "./CalendarCell";
import './Calendar.css';


export default function Calendar(props) {
    const curr_date = new Date();
    const curr_month = curr_date.getMonth();
    const curr_year = curr_date.getFullYear();

    const first_day = new Date(curr_year, curr_month, 1);
    const first_day_of_week = first_day.getDay();

    // Create a date for the first day of the next month
    const first_day_next_month = new Date(curr_year, curr_month + 1, 1);

    // Subtract one day to get the last day of the current month
    const last_day_curr_month = new Date(first_day_next_month - 1);

    const total_days = last_day_curr_month.getDate();

    const table_rows = [];
    const BASE_CELL_CLASS = "calender-cell"
    let day = 0;
    for (let i = 0; i < 5; i++) {
        let cell_class = BASE_CELL_CLASS;

        const table_cells = []
        for (let j = 0; j < 7; j++) {
            let is_empty = false;
            if (i == 0) {
                if (j < first_day_of_week) {
                    cell_class += " empty"
                    is_empty = true;
                } else {
                    day++;
                }
            } else if (i > 0) {
                if (day < total_days) {
                    day++; 
                } else {
                    is_empty = true;
                }
            }
            let output_day = is_empty ? " " : day;
            table_cells.push(<CalendarCell className={cell_class} day_val={output_day} />)
        }
        
        table_rows.push(<tr>{table_cells}</tr>)
        console.log()
    }

    return <Card className="calendar">
        <h3 className="calendar-month">{curr_date.toLocaleDateString('en-US',{month:"long"})}</h3>
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
                {table_rows}
            </tbody>
        </table>
    </Card>;
}