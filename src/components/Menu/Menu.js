import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaProductHunt } from 'react-icons/fa';


const Menu = () => (
    <nav>
        <ul style={styles.menuList}>
            <li style={styles.menuItem}>
                <Link to="/">
                    <FaHome size={35} color={'#FFF'} />
                </Link>
            </li>
            <li style={styles.menuItem}>
                <Link to="/produtos">
                    <FaProductHunt size={35} color={'#FFF'} />
                </Link>
            </li>
        </ul>
    </nav>
)

const styles = {
    menuList: {
        display: 'flex',
        listStyle: 'none',
    },
    menuItem: {
        marginRight: 50,
    },
}

export default Menu