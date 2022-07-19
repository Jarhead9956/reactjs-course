import React, { useState } from "react";
import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const changeTitleHandler = (event) => {
        setEnteredTitle(event.target.value);
    };

    const changeAmountHandler = (event) => {
        setEnteredAmount(event.target.value)
    };

    const changeDateHandler = (event) => {
        setEnteredDate(event.target.value)
    };

    const submitHandler = (event) => {
        event.preventDefault()

        const formData = {
            title: enteredTitle,
            amount: +enteredAmount,
            date: new Date(enteredDate)
        }

        if(enteredAmount !== '' && enteredTitle !== '' && enteredDate !== '') {
            props.onSaveExpenseData(formData)
        }

        setEnteredTitle('')
        setEnteredAmount('')
        setEnteredDate('')
    }
    

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="inputs-wraper">
                <div>
                    <label htmlFor="header">Title:</label>
                    <input 
                        onChange={changeTitleHandler}
                        type="text" 
                        id="header"
                        value={enteredTitle}
                    />
                </div>

                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input 
                        onChange={changeAmountHandler}
                        type="number" 
                        id="amount"
                        min="0.01"
                        step="0.01" 
                        value={enteredAmount}
                    />
                </div>

                <div>
                    <label htmlFor="date">Date:</label>
                    <input 
                        onChange={changeDateHandler}
                        type="date" 
                        id="date"
                        min='2019-01-01'
                        max='2022-12-31' 
                        value={enteredDate}
                    />
                </div>
            </div>
            <div className="button-wraper">
                <button type="button" className="cancel-btn" onClick={ props.onCancel }>Cancel</button>
                <button type="subbmit">Add Expense</button>
            </div>  
        </form>
    )
}

export default ExpenseForm