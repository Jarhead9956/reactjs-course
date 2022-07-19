import React,{useContext} from 'react'
import useInput from '../../hooks/use-input'
import useHttp from '../../hooks/use-http'
import OrderedMealContext from '../contexts/orderedMeal-Context'

import styles from './ConfirmationForm.module.css'

import Button from '../UI/Button'

const checkIsEmpty = (value) => value.trim() !== ''

const requestConfig = {
    url: 'https://educationdb-97121.firebaseio.com/meals-ordered.json',
    method: 'POST',
    body: '',
    headers: {
        'Content-Type': 'application/json'
    }
}

const ConfirmationForm = (props) => {

    const orderedMealContext = useContext(OrderedMealContext)
    const { isLoading, error, sendRequest } = useHttp()

    const {
        enteredValue: firstNameVAlue,
        isTouched: firstNameIsTouched,
        valueIsValid: firstNameIsValid,
        hasError: firstNameError,
        changeValueHandler: firstNameValueHandler,
        inputBlurHandler: firstNameBlurHandler,
        reset: firstNameReset
    } = useInput(checkIsEmpty)

    const {
        enteredValue: lastNameVAlue,
        isTouched: lastNameIsTouched,
        valueIsValid: lastNameIsValid,
        hasError: lastNameError,
        changeValueHandler: lastNameValueHandler,
        inputBlurHandler: lastNameBlurHandler,
        reset: lastNameReset
    } = useInput(checkIsEmpty)

    const {
        enteredValue: addresVAlue,
        isTouched: addressIsTouched,
        valueIsValid: addressIsValid,
        hasError: addressError,
        changeValueHandler: addressValueHandler,
        inputBlurHandler: addressBlurHandler,
        reset: addressReset
    } = useInput(checkIsEmpty)

    const {
        enteredValue: phoneVAlue,
        isTouched: phoneIsTouched,
        valueIsValid: phoneIsValid,
        hasError: phoneError,
        changeValueHandler: phoneValueHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: phoneReset
    } = useInput(checkIsEmpty)

    let formIsValid = false

    if(firstNameIsValid && lastNameIsValid && addressIsValid && phoneIsValid) {
        formIsValid = true
    }

    const applyData = (data) => {
        console.log(data)
    }

    const orderFormHandler = (event) => {
        event.preventDefault()

        const order = {
            name: firstNameVAlue + lastNameVAlue,
            address: addresVAlue,
            phone: phoneVAlue,
            meals: orderedMealContext.meals
        }
        
        requestConfig.body = order

        sendRequest(requestConfig, applyData)

        firstNameReset()
        lastNameReset()
        addressReset()
        phoneReset()

        orderedMealContext.onSendOrder()
        props.onShow()
    }

    return (
        <form className={styles.form} onSubmit={orderFormHandler}>
            <div className={`${styles['input-wrapper']} ${firstNameError ? styles.error : ''}`}>
                <label htmlFor='first-name'>First Name</label>
                <input 
                    type='text' 
                    id='first-name' 
                    onChange={firstNameValueHandler} 
                    onBlur={firstNameBlurHandler}
                    value={firstNameVAlue} 
                />
                {firstNameError && <p>First name should not be empty</p>}
            </div>

            <div className={`${styles['input-wrapper']} ${lastNameError ? styles.error : ''}`}>
                <label htmlFor='last-name'>Last name</label>
                <input 
                    type='text' 
                    id='last-name'
                    onChange={lastNameValueHandler} 
                    onBlur={lastNameBlurHandler}
                    value={lastNameVAlue} 
                />
                {lastNameError && <p>Last name should not be empty.</p>}
            </div>

            <div className={`${styles['input-wrapper']} ${addressError ? styles.error : ''}`}>
                <label htmlFor='address'>Address</label>
                <input 
                    type='text'  
                    id='address'
                    onChange={addressValueHandler} 
                    onBlur={addressBlurHandler}
                    value={addresVAlue}
                />
                {addressError && <p>Please enter valid address.</p>}
            </div>

            <div className={`${styles['input-wrapper']} ${phoneError ? styles.error : ''}`}>
                <label htmlFor='phone'>Phone</label>
                <input 
                    type='tel' 
                    id='phone'
                    onChange={phoneValueHandler} 
                    onBlur={phoneBlurHandler}
                    value={phoneVAlue}
                />
                {phoneError && <p>Please enter valid phone number.</p>}
            </div>

            <div className={styles.buttons}>
                <Button type='button' onClick={props.onBack}>Back</Button>
                <Button type='submit' disabled={!formIsValid} className={`${!formIsValid ? styles.disabled : ''}`}>Order</Button>
            </div>
        </form>
    )
}

export default ConfirmationForm