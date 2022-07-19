import React, { useState } from "react"
import './ExpenseSort.css'

const ExpenseSort = (props) => {

    const sortHandler = (event) => {
        props.onSort(event.target.value)  
    }

    return (
        <div className="sort-container">
            <label htmlFor="sort">Sort by :</label>
            <select value={props.sortValue} name="expense" id="sort" onChange={sortHandler}>
                <option value="all">All</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
        </div>
    )
}

export default ExpenseSort