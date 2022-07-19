import Container from "../UI/container"

import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <Container styles={styles.container}>
            <h2 className={styles.message}>Page not found!</h2>
        </Container>
    )
}

export default NotFound