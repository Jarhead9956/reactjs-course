import ExpenseDate from "./ExpenseDate"
import ExpensesContainer from "../containers/ExpensesContainer"
import './ExpenseItem.css'

const ExpenseItem = (props) => {
    const amount = props.data.amount
    const name = props.data.title
    const date = props.data.date

    return (
        <ExpensesContainer className="expense-item">
            <ExpenseDate date={date} /> 
            <h3 className="expense-name">{ name }</h3>
            <div className="expence-amount">
                <p>{amount}</p>
            </div>
        </ExpensesContainer>
    )
}

export default ExpenseItem