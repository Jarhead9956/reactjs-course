import { Link } from 'react-router-dom'

import styles from './QuoteItem.module.css'

const QuoteItem = (props) => {
    return (
        <li className={styles.quote}>
            <div className={styles.info}>
                <h3>{props.quote.author}</h3>
                <p>{props.quote.content}</p>
            </div>
            <Link className={styles.btn} to={`/detail/${props.quote.id}`}>See full screen!</Link>
        </li>
    )
}

export default QuoteItem