import React, {useState, useEffect} from "react"

const OrderedMealContext = React.createContext({
    meals: [],
    onOrder: () => {},
    onDecreaseAmount: () => {},
    onIncreaseAmount: () => {},
    onSendOrder: () => {}
})

export const OrderedMealContextProvider = (props) => {
    const [ordered, setOrdered] = useState([])

    const addMealHandler = (meal) => {
        setOrdered((prevState) => {
          return [meal, ...prevState]
        })
    }

    const decreaseAmountHandler = (mealId) => {
        const items = [...ordered]
        let mealPrice = 0

        items.forEach((meal, indx) => {
            if(meal.id === mealId) {
                mealPrice = meal.price
                meal.amount -- 

                if(meal.amount === 0) {
                    items.splice(indx, 1)
                }
            }
        })
        setOrdered(items)
    }

    const increaseAmountHanndler = (mealId) => {
        const items = [...ordered]

        items.forEach((meal, indx) => {
            if(meal.id === mealId) {
               meal.amount ++
            }
        })
        setOrdered(items)
    }

    const sendOrderHandler = (order) => {
        setOrdered([])
    }

    return(
        <OrderedMealContext.Provider
            value={{
                meals: ordered,
                onOrder: addMealHandler,
                onDecreaseAmount: decreaseAmountHandler,
                onIncreaseAmount: increaseAmountHanndler,
                onSendOrder: sendOrderHandler
            }}
        >
            {props.children}
        </OrderedMealContext.Provider>
    )
}

export default OrderedMealContext