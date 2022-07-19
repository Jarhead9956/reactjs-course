import React, { Fragment } from "react"
import ReactDOM from "react-dom"

import styles from './ErrorComponent.module.css'
import Button from "../button-component"

const ErrorComponent = (props) => {
    const errorMessages = {
        usernameError: 'Username must contain more than 2 characters',
        ageError: 'User age must be between 1 and 100 years'
    }

    const resetErrors = (e) => {
          props.onResetErrors()
    }

    const Errors = props => {
        return(
            <div className={ styles['error-container'] }>
                <div className={ styles.error }>
                    <h2>Error</h2>
                    <p className={ styles['error-massage'] }>{props.userErr && errorMessages.usernameError}</p>
                    <p className={ styles['error-massage'] }>{props.ageErr && errorMessages.ageError}</p>
                    <Button type='click' className={ styles.button } handleClick={resetErrors}>Ok</Button>
                </div>
            </div>
        )
    }

    return(
        <Fragment>
            {ReactDOM.createPortal(
                <Errors userErr={props.userErr} ageErr={props.ageErr} />,
                document.getElementById('pop-up')
            )}
        </Fragment>
    )
}

export default ErrorComponent