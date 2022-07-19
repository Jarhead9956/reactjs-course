import {useParams, Route, Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './DetailQuote.module.css'

import Container from '../UI/container'
import Detail from '../components/quote/Details'
import Comments from '../comments/Comments'
import { quoteActions } from '../store/quote-slice'

let isFirstRender = true

const DetailQuote = (props) => {
    const dispatch = useDispatch()
    const params = useParams()
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState([])
    const quotes = useSelector(state => state.quote.quotes) 

    const quote = quotes.find(quote => quote.id === params.quoteId)

    const showCommentsHandler = () => {
        // console.log(quote.comments)
        if(quote.comments) {
            setComments([...quote.comments])
        }
        setShowComments(true)
    }
    
    const addCommentHandler = (commentText) => {
        setComments(prevState=> {
            return [...prevState, commentText]
        })
    }

    useEffect(() => {
        if(isFirstRender){
            isFirstRender = false
            return
        }
        // console.log(comments)
        const updatedQuote = {
            id: quote.id,
            author: quote.author,
            content: quote.content,
            comments: comments
        }
        
        console.log('errrrrrr')
        fetch(`https://educationdb-97121.firebaseio.com/quotes/${params.quoteId}.json`, {
            method: 'PUT',
            body: JSON.stringify(updatedQuote),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(quoteActions.updateQuotes({
                id: data.id,
                author: data.author,
                content: data.content,
                comments: data.comments
            }))
        })
        .catch(error => {
            console.log(error)
        })
    }, [comments])

    if(!quote) {
        return (
            <Container styles={styles.container}>
                <p className={styles.message}>No Quote Found</p>
            </Container>
        )
    }

    return(
        <Container>
            <Detail quote={quote}/>
            <div className={styles.centered}>
                {!showComments && 
                <Link to={`/detail/${params.quoteId}/comments`} onClick={showCommentsHandler}>
                    Add Comment
                </Link>
                }
            </div>
            <Route path={`/detail/${params.quoteId}/comments`}>
                <Comments onAddComment={addCommentHandler} quote={quote} allComments={comments}/>
            </Route>
        </Container>
    )
}

export default DetailQuote