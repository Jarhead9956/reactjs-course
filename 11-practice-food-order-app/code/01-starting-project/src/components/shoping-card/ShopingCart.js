import React, {useContext, useState,Fragment} from "react"
import OrderedMealContext from "../contexts/orderedMeal-Context"
import ShoppingCartDetails from "./ShoppingCartDetails"

import styles from './ShopingCart.module.css'

const ShopingCard = (props) => {
    const orderedMealContext = useContext(OrderedMealContext)
    const [showDetails, setShowDetails] = useState(false)

    const showDetailsHandler = () => {
        if(showDetails === false) {
            setShowDetails(true)
        }else{
            setShowDetails(false)
        }
    }

    return(
        <Fragment>
            {showDetails && <ShoppingCartDetails onShow={showDetailsHandler}/>}
            <button className={styles['shoping-cart']} onClick={showDetailsHandler}>
                <div className={styles.details}>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <p>Your cart</p>
                    <div className={styles.amount}>
                        <p>{orderedMealContext.meals.length}</p>
                    </div>
                </div>
            </button>
        </Fragment>
    )
}

export default ShopingCard