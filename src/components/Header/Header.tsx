import { NavLink } from 'react-router'
import styles from './header.module.css'

export default function Header() {

    return (
        <header className={styles.header}>
            <nav>
                <NavLink to='/'>Booking</NavLink>
                <NavLink to='/admin'>Admin</NavLink>
            </nav>
        </header>
    )
}


