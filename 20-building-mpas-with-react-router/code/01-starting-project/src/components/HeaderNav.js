import { NavLink } from 'react-router-dom'
import styles from './HeaderNav.module.css'

import Container from '../UI/container'

const HeaderNav = () => {
    return(
        <div className={styles['nav-container']}>
            <Container styles={styles.container}>
                <NavLink to='/' className={styles.logo}>Great Quote</NavLink>
                <ul className={styles.navigation}>
                    <li>
                        <NavLink to='/allQuote' activeClassName={styles.active}>All Quotes</NavLink>
                    </li>
                    <li>
                        <NavLink to='/addNewQuote' activeClassName={styles.active}>Add a Quote</NavLink>
                    </li>
                </ul>
            </Container>
        </div>
    )
}

export default HeaderNav