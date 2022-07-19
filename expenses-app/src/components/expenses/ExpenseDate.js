import './ExpenseDate.css'

const ExpenseDate = (props) => {
    const month = props.date.toLocaleString('en-US', { month: 'long' });
    const day = props.date.toLocaleString('en-US', { day: '2-digit' });
    const year = props.date.getFullYear();

    return (
        <div className="date">
            <p className="day">{ day }</p>
            <p className="month">{ month }</p>
            <p className="year">{ year }</p>
        </div>
    )
}

export default ExpenseDate