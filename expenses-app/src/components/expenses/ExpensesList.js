import React from "react"
import ExpenseItem from "./ExpenseItem"
import './ExpensesList.css'

const SortedExpenses = (props) => {
    if(props.items.length === 0) {
        return (
            <h2 className="no-expenses">No expenses found</h2>
        )
    }
    
    return (
        <div>
            {props.items.map(item => <ExpenseItem data={ item } key={ item.id } />)}
        </div>
    )
}

export default SortedExpenses