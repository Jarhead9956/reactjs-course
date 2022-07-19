import styles from './Container.module.css'

const Container = (props) => {
    return(
        <div className={styles['form-container']}>
            {props.children}
        </div>
    )
};

export default Container