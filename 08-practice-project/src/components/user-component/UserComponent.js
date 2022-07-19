import React, { useState } from "react"
import Button from "../button-component"
import styles from './UserComponent.module.css'

const UserComponent = (props) => {
    const [enteredUsername, setEnteredUsername] = useState('')
    const [enteredAge, setEnteredAge] = useState('')

    const updateUsername = (event) => {
        setEnteredUsername(event.target.value)
    }

    const updateAge = (event) => {
        setEnteredAge(event.target.value)
    }

    const userFormSubmit = (event) => {
        event.preventDefault()

        const userData = {
            username: enteredUsername,
            usernameError: false,
            age: +enteredAge,
            ageError: false
        }

        if(enteredUsername.length <= 2 ) {
            userData.usernameError = true
        }else {
            userData.usernameError = false
        }

        if(+enteredAge <= 2 || +enteredAge > 100) {
            userData.ageError = true
        }else {
            userData.ageError = false
        }

        props.onCreateUser(userData)

        if(!userData.usernameError && !userData.ageError) {
            setEnteredAge('')
            setEnteredUsername('')
        }
    }

    return (
        <div className={styles['form-wraper']}>
            <form className={styles.form} onSubmit={userFormSubmit}>
                <label>Username:</label>
                <input type="text" onChange={updateUsername} value={ enteredUsername } />

                <label>Age (Years):</label>
                <input type="number" onChange={updateAge} value={ enteredAge } />
                <Button type="submit" >Add User</Button>
            </form>
        </div>
    )
}

export default UserComponent