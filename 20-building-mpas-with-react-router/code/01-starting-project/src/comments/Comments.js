import Container from "../UI/container"

import styles from './Comments.module.css'

import CommentsForm from "./CommentsForm"

const Comments = (props) => {
    const comments = props.allComments
    // console.log(comments)
    return(
        <Container>
            <CommentsForm onAddComment={props.onAddComment}/>
            <div className={styles.comments}>
                {comments.length === 0 && <p>No comments yet! for quote {props.quote.id}</p>}
                {comments && comments.map((comment, ind) => {
                    return <p key={ind} className={styles['single-comment']}>{comment}</p>
                })}
            </div>
        </Container>
    )
}

export default Comments