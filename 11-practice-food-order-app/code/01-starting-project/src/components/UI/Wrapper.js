import react from "react"

import styles from './Wrapper.module.css'

const Wrapper = (props) => {
    return(
        <div className={`${styles.wrapper} ${props.className}`}>
            {props.children}
        </div>
    )
}

export default Wrapper