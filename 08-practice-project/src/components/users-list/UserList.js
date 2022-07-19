import React from "react"
import styles from './UserList.module.css'
const UserList = (props) => {
    let isEmpty = true

    if(props.users.length > 0) {
        isEmpty = false
    }

    return(
        <div className={` ${styles['users-list']} ${isEmpty && styles.hide}`}>
            <ul>
                {props.users.map((user, ind) => {
                  return  <li key={ind}>{user.username} {`(${ user.age } years old)`}</li>
                })}
            </ul>
        </div>
    )
}

export default UserList