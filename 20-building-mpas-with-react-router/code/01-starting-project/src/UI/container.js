import styles from './container.module.css'

const Container = (props) => {
    return(
        <div className={`${styles.container} ${props.styles}`}>{props.children}</div>
    )
}

export default Container