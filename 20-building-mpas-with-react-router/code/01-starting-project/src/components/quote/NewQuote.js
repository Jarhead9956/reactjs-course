import { useRef, useState, Fragment } from 'react'
import { useHistory, Prompt } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import styles from './NewQuote.module.css'
import { quoteActions } from '../../store/quote-slice'

const NewQuote = () => {
    const dispatch = useDispatch()

    const [isEntering, setIsEntering] = useState(false)
    const author = useRef()
    const quoteText = useRef()

    const history = useHistory()

    const formFocusedHandler = () => {
        setIsEntering(true)
    }

    const finishEnteringHandler = () => {
        setIsEntering(false)
    }

    const addQuoteHandler = (event) => {
        event.preventDefault()

        const quote = {
            author: author.current.value,
            content: quoteText.current.value
        }

        fetch('https://educationdb-97121.firebaseio.com/quotes.json', {
            method: 'POST',
            body: JSON.stringify(quote),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            const quoteId = data.name

            dispatch(quoteActions.addItemToQuotes({...quote, id: quoteId}))
            history.push('/')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <Fragment>
            <Prompt 
                when={isEntering}
                message={(location) => 'Are you sure you want to leave? All your entered data will be lost!'}
            />
            <form onFocus={formFocusedHandler} className={styles.form} onSubmit={addQuoteHandler}>
                <div className={styles.name}>
                    <label>Author name:</label>
                    <input ref={author}></input>
                </div>
                <div className={styles.text}>
                    <label>Quote text:</label>
                    <textarea rows='10' ref={quoteText}></textarea>
                </div>
                <div className={styles.btn}>
                    <button onClick={finishEnteringHandler}>Add Quote</button>
                </div>
            </form>
        </Fragment>
    )
}

export default NewQuote