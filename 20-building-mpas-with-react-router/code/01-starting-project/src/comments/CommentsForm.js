import { useRef } from 'react'

import styles from './CommentsForm.module.css'

const CommentsForm = (props) => {
    const textRef = useRef()

    const submitCommentHandler = (event) => {
        event.preventDefault()

        props.onAddComment(textRef.current.value)
        textRef.current.value = ''
    }
    
    return(
        <form className={styles.form} onSubmit={submitCommentHandler}>
            <textarea ref={textRef} rows='6'></textarea>
            <button>Submit Comment</button>
        </form>
    )
}

export default CommentsForm