import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa';
import { MdAppRegistration } from "react-icons/md";


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
                    <MdAppRegistration size={35} color={'#FFF'} />
                </Link>
            </li>
            <li style={styles.menuItem}>
                <Link to="/categorias">
                    <MdAppRegistration size={35} color={'#FFF'} />
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