import react from "react"
import Wrapper from '../UI/Wrapper'

import styles from './TextBanner.module.css'

const TextBanner = (props) => {
    return(
        <Wrapper className={styles.flex}>
            <div className={styles['text-banner']}>
                <h2>Delicious Food, Delivered To You</h2>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC</p>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
            </div>
        </Wrapper>
    )
}

export default TextBanner