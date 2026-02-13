import Calendar from "../Calendar/Calendar";
import Card from "../UI/Card";
import './MainContent.css'

export default function MainContent() {
    return <Card className="main">
        <Calendar />
    </Card>;
}