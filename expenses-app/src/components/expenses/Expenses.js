import React, { useState } from "react"
import ExpensesContainer from "../containers/ExpensesContainer"
import ExpenseSort from "./ExpenseSort"
import ExpenseList from "./ExpensesList"
import ExpensesChart from "./ExpensesChart"
import './Expenses.css'

const Expenses = (props) => {
    const [sortBy, setSortBy] = useState('all')

    const sortedExpenses = props.items.filter(item => {
        const itemDate = item.date.getFullYear().toString()
        if(sortBy === itemDate) {
            return item
        } else if(sortBy === 'all') {
            return item
        }
    })
    
    const sortExpensesHandler = (selectedYear) => {
        setSortBy(selectedYear)
    }

    return (
        <ExpensesContainer className="container">
            <ExpenseSort sortValue={ sortBy } onSort={ sortExpensesHandler } />
            { (sortBy !== 'all') && <ExpensesChart expenses={ sortedExpenses } /> }
            <ExpenseList items={ sortedExpenses } />
        </ExpensesContainer>
    )
}

export default Expenses