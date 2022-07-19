import React from "react"
import styles from './index.module.css'

const Button = (props) => {
    return(
        <button type={props.type} className={`${ styles.button } ${props.className}`} onClick={props.handleClick}>
            {props.children}
        </button>
    )
}

export default Button