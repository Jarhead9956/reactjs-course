import './ExpensesContainer.css'

const ExpensesContainer = (props) => {
    const classes = 'expenses-container ' + props.className;
    
    return (
        <div className={classes}>{props.children}</div>
    )
}

export default ExpensesContainer