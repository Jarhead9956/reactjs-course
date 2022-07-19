import { useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import classes from './ProfileForm.module.css';

import { API_KEY } from '../../App';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const authCtx = useContext(AuthContext)
  const history = useHistory()

  const newPasswordInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()

    const newPassword = newPasswordInputRef.current.value

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPassword,
        returnSecureToken: false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      authCtx.logout()
      history.replace('/auth')
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='6' ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
