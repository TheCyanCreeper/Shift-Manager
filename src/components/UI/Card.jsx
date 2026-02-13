import "./Card.css"

export default function Card(props) {
    const CARD_CLASS = "card"
    let classes =  CARD_CLASS + " " + props.className
    return <div className={classes}>{props.children}</div>;
}