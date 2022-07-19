import styles from './Details.module.css'

import Container from '../../UI/container'

const DetailsQuote = (props) => {
    
    return (
        <Container styles={styles.flex}>
            <div className={styles['quote-container']}>
                <div className={styles.content}>
                    <p>{props.quote.content}</p>
                </div>
                <div className={styles.author}>
                    <h2>{props.quote.author}</h2>
                </div>
            </div>
        </Container>
    )
}

export default DetailsQuote