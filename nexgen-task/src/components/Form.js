import {Fragment, useState} from 'react';

import styles from './Form.module.css';

import LoadingSpinner from '../UI/LoadingSpinner';
import SuccessModal from '../UI/SuccessModal';

//Imprt custom hook
import useInput from '../hooks/use-input';

//Import helper functions
import { isNotEmpty, emailValidator } from '../helpers/verficationFunctions';
import { options } from '../helpers/selectInputOptions';

const Form = (props) => {
    //Get inputs value and validate inputs whith custom hook an useState
    const {
        enteredValue: enteredFirstName,
        valueIsValid: enteredFirstNameIsValid,
        hasError: firstNameInputIsValid,
        changeValueHandler: changeFirstNameValueHandler,
        inputBlurHandler: firstNameInputBlurHandler,
        reset: resetFirstNameInput
    } = useInput(isNotEmpty);

    const {
        enteredValue: enteredLastName,
        valueIsValid: enteredLastNameIsValid,
        hasError: lastNameInputIsValid,
        changeValueHandler: changeLastNameValueHandler,
        inputBlurHandler: lastNameInputBlurHandler,
        reset: resetLasttNameInput
    } = useInput(isNotEmpty);

    const {
        enteredValue: enteredEmail,
        valueIsValid: enteredEmailIsValid,
        hasError: emailInputIsInvalid,
        changeValueHandler: changeEmailValueHandler,
        inputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    } = useInput(emailValidator);

    const {
        enteredValue: enteredPhone,
        valueIsValid: enteredPhoneIsValid,
        hasError: phoneInputIsInvalid,
        changeValueHandler: changePhoneValueHandler,
        inputBlurHandler: phoneInputBlurHandler,
        reset: resetPhoneInput
    } = useInput(isNotEmpty);

    const {
        enteredValue: enteredMessage,
        valueIsValid: enteredMessageIsValid,
        hasError: messageInputIsInvalid,
        changeValueHandler: changeMessageValueHandler,
        inputBlurHandler: messageInputBlurHandler,
        reset: resetMessageInput
    } = useInput(isNotEmpty);

    const [messageSubject, setMessageSubject] = useState('Other');
    const [userVerification, setUserVerification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formSubmitIsSuccess, setFormSubmitIsSuccess] = useState(false);
    const [formSubmitMessage, setFormSubmitMessage] = useState('');
    
    let formIsValid = false;

    //Check if form is valid. Made submit button enable
    if(enteredFirstNameIsValid && enteredLastNameIsValid && enteredEmailIsValid && enteredMessageIsValid && userVerification) {
        formIsValid = true
    };

    //Set message subject value
    const changeMessageSubjectHandler = (event) => {
        setMessageSubject(event.target.value)
    };

    //Set user 'I am not robot' value
    const changeUserStatusHandler = (event) => {
        setUserVerification(prevState => !prevState)
    };

    //Reset form submit is success
    const successHandler = () => {
        setFormSubmitIsSuccess(false)
    }

    //Submit form function
    const submitFormHandler = (event) => {
        event.preventDefault()
        //Checking if all inputs are correct.
        if(!enteredFirstNameIsValid || !enteredLastNameIsValid || !enteredEmailIsValid || !enteredMessageIsValid || !userVerification) {
            setFormSubmitIsSuccess(true);
            setFormSubmitMessage('Error: Please fill all inputs correctly.');
            return;
        };

        //Get value from inpusts
        const formInfo = {
            firstName: enteredFirstName,
            lastName: enteredLastName,
            phoneNumber: enteredPhone,
            messageSubject: messageSubject,
            message: enteredMessage
        };

        //Start loadin spinner
        setIsLoading(true)
        
        //Send HTTP POST request
        fetch('https://eowiunu7q8t4pqj.m.pipedream.net', {
            method: 'POST',
            body: JSON.stringify(formInfo),
            mode: "cors",
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.ok) {
                return res.json()
            }else {
                return res.json().then(data => {
                  let errorMessage = 'Submitting failed!'
                  setIsLoading(false)
                  throw new Error(errorMessage);
                })
            }
        })
        .then(data => {
            //Reset inpust value
            setIsLoading(false);
            resetFirstNameInput();
            resetLasttNameInput();
            resetEmailInput();
            resetPhoneInput();
            resetMessageInput();
            setUserVerification(false);

            //Show message for submition success.
            setFormSubmitIsSuccess(true);
            setFormSubmitMessage('Form has been send succesfuly');
        }).catch(error => {
            setFormSubmitIsSuccess(true);
            setFormSubmitMessage(error.message);
        })
    }

    //Check if form is submited. Render loading spinner 
    if(isLoading) {
        return(
            <div className={styles.centered}>
                <LoadingSpinner />
            </div>
        )
    }

    return(
        <Fragment>
            {formSubmitIsSuccess && <SuccessModal
                title={formSubmitMessage}
                onConfirm={successHandler}/>
            }
            <h2 className={styles['form-header']}>Contact form</h2>
            <p className={styles['form-description']}>Please fill in your information and we'll be sending your order in no time</p>
            <form className={styles.form} onSubmit={submitFormHandler}>
                <div className={styles['form-name']}>
                    <label htmlFor='name'>Your Name</label>
                    <div className={styles['form-name-inputs']}>
                        <input 
                        type='text' 
                        id='name'
                        placeholder='First Name'
                        onChange={changeFirstNameValueHandler}
                        onBlur={firstNameInputBlurHandler}
                        value={enteredFirstName}/>
                        <input 
                        type='text' 
                        id='name'
                        placeholder='Last Name'
                        onChange={changeLastNameValueHandler}
                        onBlur={lastNameInputBlurHandler}
                        value={enteredLastName}/>
                        {firstNameInputIsValid || lastNameInputIsValid ? <p className='error-text'>Name must not be empty.</p> : ''}
                    </div>
                </div>

                <div className={styles['form-email']}>
                    <label htmlFor='email'>Your Email</label>
                    <div className={styles['form-email-input']}>
                        <input 
                        type='email' 
                        id='email'
                        placeholder='e.g. hello@contact.net'
                        onChange={changeEmailValueHandler}
                        onBlur={emailInputBlurHandler}
                        value={enteredEmail}/>
                        {emailInputIsInvalid && <p className='error-text'>Please enter valid email.</p>}
                    </div>
                </div>

                <div className={styles['form-phone']}>
                    <label htmlFor='phone'>Phone</label>
                    <div className={styles['form-phone-inputs']}>
                        <input 
                        type='number' 
                        id='phone'
                        placeholder='###' 
                        onChange={changePhoneValueHandler}
                        onBlur={phoneInputBlurHandler}
                        value={enteredPhone}/>
                        {phoneInputIsInvalid && <p className='error-text'>Please enter a valid phone number.</p>}
                    </div>
                </div>

                <div className={styles['form-message-subject']}>
                    <label htmlFor='subjects'>Message subject</label>
                    <div className={styles['form-message-subject-options']}>
                        <select id="subjects" name="subjects" onChange={changeMessageSubjectHandler}>
                            {options.map((option, indx) => {
                               return <option key={indx} value={option.value}>{option.label}</option>
                            })}
                        </select>
                    </div>  
                </div>

                <div className={styles['form-message']}>
                    <label htmlFor="message">Message:</label>
                    <div className={styles['form-message-textarea']}>
                        <textarea
                            id="message"
                            name="message"
                            rows='5'
                            onChange={changeMessageValueHandler}
                            onBlur={messageInputBlurHandler}
                            value={enteredMessage}>
                        </textarea>
                        {messageInputIsInvalid && <p className='error-text'>Message is requared.</p>}
                    </div>
                </div>

                <div className={styles['form-verification']}>
                    <label htmlFor="user">Verification</label>
                    <div className={styles['form-verification-check']}>
                        <div className={styles.checkbox}>
                            <input type="checkbox" id="user" name="user" onChange={changeUserStatusHandler}/>
                            <label htmlFor="user"> I'm not a robot</label>
                        </div>
                    </div>
                </div>

                <div className={styles['form-control']}>
                    <button disabled={!formIsValid}>Submit form</button> 
                </div>
            </form>
        </Fragment>
    );
};

export default Form