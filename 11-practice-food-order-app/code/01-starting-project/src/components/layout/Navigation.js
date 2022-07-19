import react from "react"
import ShopingCart from "../shoping-card/ShopingCart"
import Wrapper from "../UI/Wrapper"

import styles from './Navigation.module.css'

const Navigation = (props) => {
    return(
        <nav className={styles.navigation}>
            <Wrapper className={styles.wrapper}>
                <h2 className={styles.logo}>ReactMeals</h2>
                <ShopingCart />
            </Wrapper>
        </nav>
    )
}

export default Navigation