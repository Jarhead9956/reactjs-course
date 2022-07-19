import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../contexts/aurh-context';
import InputComponent from '../UI/input/input';

const inputsReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { 
      emailValue: action.emailVal,
      emailIsValid: action.emailVal.includes('@'),
      passwordValue: state.passwordValue,
      passwordIsValid: state.passwordIsValid,
      formIsValid: action.emailVal.includes('@') && state.passwordValue.trim().length > 6
     };
  }
  if(action.type === 'PASSWORD_INPUT') {
    return {
      emailValue: state.emailValue,
      emailIsValid: state.emailIsValid,
      passwordValue: action.passwordVal,
      passwordIsValid: action.passwordVal.trim().length > 6,
      formIsValid: state.emailValue.includes('@') && action.passwordVal.trim().length > 6
    }
  }
  if(action.type === 'INPUT_BLUR') {
    return {
      emailValue: state.emailValue,
      emailIsValid: state.emailValue.includes('@'),
      passwordValue: state.passwordValue,
      passwordIsValid: state.passwordValue.trim().length > 6,
      formIsValid: state.emailValue.includes('@') && state.passwordValue.trim().length > 6
    }
  }
  return {
    emailValue: '',
    emailIsValid: false,
    passwordValue: '',
    passwordIsValid: false,
    formIsValid: false
  }
}

const Login = (props) => {
  const ctx = useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  const [inputsState, dispatchInputs] = useReducer(inputsReducer, {
    emailValue: '',
    emailIsValid: null,
    passwordValue: '',
    passwordIsValid: null,
    formIsValid: false
  });

  // useEffect(() => {
  //   setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6)
  //   console.log('useEffect')
  // }, [enteredEmail, enteredPassword])

  // useEffect(() => {
  //   const identifer = setTimeout(() => {
  //     console.log('ADD EFFECT')
  //     setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6)
  //   }, 1000)

  //   return () => {
  //     console.log('CLEARED')
  //     clearTimeout(identifer)
  //   }
  // }, [enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    dispatchInputs({type: 'USER_INPUT', emailVal: event.target.value});

    // setFormIsValid(event.target.value.includes('@') && inputsState.passwordValue.trim().length > 6)
  };

  const passwordChangeHandler = (event) => {
    dispatchInputs({type: 'PASSWORD_INPUT', passwordVal: event.target.value})

    // setFormIsValid(inputsState.emailValue.includes('@') && event.target.value.trim().length > 6)
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    dispatchInputs({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchInputs({type: 'INPUT_BLUR'})
    
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(inputsState.emailValue, inputsState.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <InputComponent 
          isValid={inputsState.emailIsValid}
          text='E-mail'
          type="email"
          id="email"
          value={inputsState.emailValue}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <InputComponent 
          isValid={inputsState.passwordIsValid}
          text='Password'
          type="password"
          id="password"
          value={inputsState.passwordValue}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!inputsState.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
