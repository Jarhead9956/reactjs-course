import React, { useState } from "react"
import ExpensesContainer from "../containers/ExpensesContainer"
import ExpenseForm from "./ExpenseForm"
import NewExpenseBtn from "./NewExpenseBtn"
import './NewExpense.css'


const NewExpense = (props) => {
    const [expenseFormStatus, setExpenseFormStatus] = useState(false)
    
    

    const saveExpenseDataHandler = (event) => {
        const newExpense = {
            ...event,
            id: `e-${Math.random()}`
        }

        props.onNewExpense(newExpense)
        setExpenseFormStatus(false)
    }

    const changeBtnStatus = (event) => {
        if(expenseFormStatus === false) {
            setExpenseFormStatus(true)
        }else {
            setExpenseFormStatus(false)
        }
    }

    return (
        <ExpensesContainer className="new-expense-container">
            { !expenseFormStatus && <NewExpenseBtn customOnClick={ changeBtnStatus } /> }
            { expenseFormStatus && <ExpenseForm onSaveExpenseData={ saveExpenseDataHandler } onCancel={ changeBtnStatus } /> }
        </ExpensesContainer>
    )
}

export default NewExpense