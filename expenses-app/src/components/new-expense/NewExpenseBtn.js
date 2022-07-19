import React from "react"
import './NewExpenseBtn.css'

const NewExpenseBtn = (props) => {
    return (
        <div className="new-expense-btn-container">
            <button type="button" onClick={ props.customOnClick }>Add new expense</button>
        </div>
    )
}

export default NewExpenseBtn