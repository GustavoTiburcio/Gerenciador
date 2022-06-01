import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaBook, FaCheck } from 'react-icons/fa';
import { AiTwotoneEdit } from "react-icons/ai";
import { makeStyles } from '@material-ui/styles';


const Menu = () => {
    const styles = useStyles();
    return (
        <nav>
            <ul className={styles.menuList}>
                <li className={styles.menuItem}>
                    <Link to="/" className={styles.link}>
                        <FaHome size={35} color={'#FFF'} />
                        <span className={styles.text}>Início</span>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link to="/produtos" className={styles.link}>
                        <AiTwotoneEdit size={35} color={'#FFF'} />
                        <span className={styles.text}>Produtos</span>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link to="/categorias" className={styles.link}>
                        <AiTwotoneEdit size={35} color={'#FFF'} />
                        <span className={styles.text}>Categorias</span>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link to="/mesas" className={styles.link}>
                        <AiTwotoneEdit size={35} color={'#FFF'} />
                        <span className={styles.text}>Mesas</span>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link to="/" className={styles.link}>
                        <FaCheck size={35} color={'#FFF'} />
                        <span className={styles.text}>Atendimentos</span>
                    </Link>
                </li>
                <li className={styles.menuItem}>
                    <Link to="/" className={styles.link}>
                        <FaBook size={35} color={'#FFF'} />
                        <span className={styles.text}>Histórico</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const useStyles = makeStyles({
    menuList: {
        display: 'flex',
        listStyle: 'none',
    },
    menuItem: {
        marginRight: 50,
    },
    link:{
        textDecoration: 'none'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFF',
        verticalAlign: 'top',
        marginLeft: 3
    },
});


export default Menu