import React, {Fragment, useContext, useState, useEffect} from "react"
import ReactDom from "react-dom"
import Button from "../UI/Button"
import OrderedMealContext from "../contexts/orderedMeal-Context"
import ConfirmationForm from "../order-confirmation-form/ConfirmationForm"

import styles from "./ShoppingCartDetails.module.css"

const Backdrop = (props) => {
    return(
        <div className={styles.backdrop}></div>
    )
}

const Details = (props) => {
    const orderedMeal = useContext(OrderedMealContext)
    const [total, setTotal] = useState(0)
    const [showForm, setShowForm] =useState(false)

    const decreaseMeal = (event) => {
        const mealId = event.target.getAttribute('meal-id')
        const mealPrice = +event.target.getAttribute('meal-price')

        setTotal(total - mealPrice)
        
        orderedMeal.onDecreaseAmount(mealId)
    }

    const increaseMeal = (event) => {
        const mealId = event.target.getAttribute('meal-id')
        const mealPrice = +event.target.getAttribute('meal-price')

        setTotal(total + mealPrice)
        
        orderedMeal.onIncreaseAmount(mealId)
    }

    const sendOrderHandler = (event) => {
        setShowForm(true)
    }

    const closeFormHandler = () => {
        setShowForm(false)
    }

    useEffect(() => {
        orderedMeal.meals.forEach((meal) => {
            setTotal(prevState => {
                return prevState + (meal.price * meal.amount)
            })
        })
    }, [])

    return(
        <Fragment>
        {showForm && <ConfirmationForm onBack= {closeFormHandler} onShow={props.onShow} />}
        {!showForm && 
        <div className={styles.details}>
            {orderedMeal.meals.map((meal) => {
                return(
                    <div className={styles.meal} key={meal.id}>
                        <div className={styles['meal-details']}>
                            <h4 className={styles['meal-name']}>{meal.name}</h4>
                            <p className={styles['meal-price']}>${(meal.price * meal.amount).toFixed(2)}</p>
                            <p className={styles['meal-amount']}>x {meal.amount}</p>
                        </div>
                        <div className={styles.controlers}>
                            <button className={styles.decrease} meal-price={meal.price} meal-id={meal.id} onClick={decreaseMeal}>-</button>
                            <button className={styles.increace} meal-price={meal.price} meal-id={meal.id} onClick={increaseMeal}>+</button>
                        </div>
                    </div>     
                )
            })}
            <div className={styles.total}>
                <h4>Total Amount:</h4>
                <p>$ {total.toFixed(2)}</p>
            </div>
            <div className={styles.buttons}>
                <Button onClick={props.onShow} className={styles['close-btn']} >Close</Button>
                <Button onClick={sendOrderHandler}>Order</Button>
            </div>
        </div>}
        </Fragment>
    )
}

const ShoppingCartDetails = (props) => {
    return(
        <Fragment>
            {ReactDom.createPortal(
              <Backdrop />,
              document.getElementById('backdrop')
            )}
            {ReactDom.createPortal(
              <Details onShow={props.onShow} />,
              document.getElementById('shopping-cart-details')
            )}
        </Fragment> 
    )
}

export default ShoppingCartDetails