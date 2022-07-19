import react from "react"
import mealsImage from '../../images/banner-raw-uncooked-ingredients-cooking-pasta-background-food-healthy-eating-concept-186934703.jpg'

import styles from './HeaderBanner.module.css'

const HeaderBanner = (props) => {
    return(
        <div className={styles['header-banner']}>
            <img src={mealsImage} alt='A table full of delicious food!'></img>
        </div>
    )
}

export default HeaderBanner