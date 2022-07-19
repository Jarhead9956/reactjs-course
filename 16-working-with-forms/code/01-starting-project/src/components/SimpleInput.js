import React from 'react'
import useInput from '../hooks/use-input'

const isNotEmpty = (value => value.trim() !== '')
const emailValidator = (value => value.match(/^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))

const SimpleInput = (props) => {
  const {
    enteredValue: nameInputValue,
    valueIsValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    changeValueHandler: changeNameInputHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput
  } = useInput(isNotEmpty)

  const {
    enteredValue: emailInputValue,
    valueIsValid: enteredEmailIsValid,
    hasError: emailInputIsInvalid,
    changeValueHandler: changeEmailInputHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput
  } = useInput(emailValidator)

  let formIsValid = false

  if(enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()

    if(!enteredNameIsValid || !enteredEmailIsValid) {
      console.log('disabled')
      return
    }

    resetNameInput()
    resetEmailInput()

    console.log('sucsess')
  }

  let nameInputClases = nameInputIsInvalid ? 'form-control invalid' : 'form-control' 
  let emailInputClases = emailInputIsInvalid ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClases}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={changeNameInputHandler} 
          onBlur={nameInputBlurHandler}
          value={nameInputValue}/>
        {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
      </div>

      <div className={emailInputClases}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='email' 
          id='email' 
          onChange={changeEmailInputHandler} 
          onBlur={emailInputBlurHandler}
          value={emailInputValue}/>
        {emailInputIsInvalid && <p className='error-text'>Please enter valid email.</p>}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid} >Submit</button>
        
      </div>
    </form>
  );
};

export default SimpleInput;
