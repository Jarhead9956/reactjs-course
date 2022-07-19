import { useState, useRef, useContext, } from 'react';
import { useHistory } from 'react-router-dom'

import classes from './AuthForm.module.css';

import { API_KEY } from '../../App';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault()
    setIsLoading(true)

    let url
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    if(isLogin){
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    } else{
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }

    fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed!'
          setIsLoading(false)
          throw new Error(errorMessage);
        })
      }
    })
    .then(data => {
      const token = data.idToken
      
      setIsLoading(false)
      authCtx.login(token)
      history.replace('/')
    })
    .catch(e => {
      alert(e)
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
