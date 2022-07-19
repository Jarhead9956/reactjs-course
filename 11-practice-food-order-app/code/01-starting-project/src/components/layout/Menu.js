import react, {useState,useContext, useEffect} from "react"
import useHttp from "../../hooks/use-http"

import Wrapper from "../UI/Wrapper"
import Button from "../UI/Button"
import OrderedMealContext from "../contexts/orderedMeal-Context"

import styles from "./Menu.module.css"

const requestConfig = {
    url: 'https://educationdb-97121.firebaseio.com/meals.json'
}

const Menu = (props) => {
    const [menu, setMenu] = useState([])

    const {isLoading, error, sendRequest} = useHttp()

    const orderedMealContext = useContext(OrderedMealContext)

    const transformMenu = (menuObj) => {
        const newData = []

        for(const key in menuObj) {
            const id = key
            const data = menuObj[key]

            newData.push({id, ...data})
        }

        setMenu(newData)
    }

    useEffect(() => {
        sendRequest(requestConfig, transformMenu)
    },[])

    const amountHandler = (event) => {
        const amountValue =  event.target.value
        const inputId = event.target.getAttribute('data-key')
        
        setMenu(meals => {
            return meals.map(meal => {
                 return(meal.id === inputId ? {
                     ...meal,
                     amount: +amountValue
                 } : meal)
             })
         })
    }

    const mealHendler = (event) => {
        event.preventDefault()
        const mealId = event.target.getAttribute('data-key') 
        let orderedMeal = {}

        menu.forEach(meal => {
            if(meal.id === mealId) {
                orderedMeal = {
                    name: meal.name,
                    describtion: meal.describtion,
                    price: meal.price,
                    id: meal.id,
                    amount: +meal.amount
                }
            }
        })

        orderedMealContext.onOrder(orderedMeal)
        
        setMenu(meals => {
            return meals.map(meal => {
                 return(meal.id === mealId ? {
                     ...meal,
                     amount: ''
                 } : meal)
             })
         })
    }  
    
    // console.log(error)
    
    return(
        <Wrapper className={styles.flex}>
            <div className={styles['menu-container']}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {menu.map(item => {
                    return(
                        <form className={styles['meal-container']} key={item.id} data-key={item.id} onSubmit={mealHendler}>
                            <div className={styles.meal} >
                                <h4 className={styles.name} id="name">{item.name}</h4>
                                <p className={styles.describtion}>{item.describtion}</p>
                                <p className={styles.price}>$ {item.price}</p>
                            </div>
                            <div className={styles.controls}>
                                <label htmlFor="quantity">Amount:</label>
                                <input onChange={amountHandler} className={styles.input} type="number" min="0" id="quantity" placeholder="0" value={item.amount} data-key={item.id}/>
                                <Button type="submit" className={styles.button}>+ Add</Button>
                            </div>
                        </form>
                    )
                })}
            </div>
        </Wrapper>
    )

}

export default Menu