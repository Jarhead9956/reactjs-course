import React, { useState } from 'react'
import styles from './App.module.css'
import UserComponent from './components/user-component/UserComponent'
import UserList from './components/users-list/UserList'
import ErrorComponent from './components/error-component/ErrorComponent'

function App() {
  const [allUsers, setAllUsers] = useState([])
  const [usernameErr, setUsernameErr] = useState(false)
  const [ageErr, setAgeErr] = useState(false)

  const createUserHandler = (userData) => {
    if(userData.usernameError) {
      setUsernameErr(true)
    }else {
      setUsernameErr(false)
    }
    
    if(userData.ageError) {
      setAgeErr(true)
    }else {
      setAgeErr(false)
    }
    
    if(!userData.usernameError && !userData.ageError) {
      setAllUsers(prevState => [userData, ...prevState])
    }
  }

  const resetErrors = () => {
    setUsernameErr(false)
    setAgeErr(false)
  }

  return (
    <div className={ styles.App }>
      {/* {usernameErr && <ErrorComponent userErr={ usernameErr } ageErr={ageErr} onResetErrors={ resetErrors } />}
      {ageErr && <ErrorComponent ageErr={ageErr} userErr={ usernameErr } onResetErrors={ resetErrors }/>} */}
      {(usernameErr || ageErr) ? <ErrorComponent userErr={ usernameErr } ageErr={ageErr} onResetErrors={ resetErrors } />: ''}
      <UserComponent onCreateUser={createUserHandler} />
      <UserList users={ allUsers } />
    </div>
  );
}

export default App;
