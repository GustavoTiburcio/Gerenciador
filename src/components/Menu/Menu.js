import * as React from 'react';
// import { Link } from 'react-router-dom'
import { FaHome, FaBook } from 'react-icons/fa';
import { AiTwotoneEdit } from "react-icons/ai";
import { makeStyles } from '@material-ui/styles';
import { IoRestaurant } from "react-icons/io5";
import Button from '@mui/material/Button';
import MenuMui from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";


const Menu = () => {
    const styles = useStyles();
    let navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <nav>

            <ul className={styles.menuList}>
                <li className={styles.menuItem}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={() => { navigate('/') }}
                    >
                        <FaHome size={35} color={'#FFF'} />
                        <span className={styles.text}>
                            Início
                        </span>
                    </Button>
                </li>
                <li className={styles.menuItem}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <AiTwotoneEdit size={35} color={'#FFF'} />
                        <span className={styles.text}>
                            Cadastros
                        </span>
                    </Button>
                    <MenuMui
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {
                            handleClose()
                            navigate('/cadastro/produtos');
                        }}>Produtos</MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            navigate('/cadastro/categorias');
                        }}>Categorias</MenuItem>
                        <MenuItem onClick={() => {
                            handleClose()
                            navigate('/cadastro/mesas');
                        }}>Mesas</MenuItem>
                    </MenuMui>
                </li>
                <li className={styles.menuItem}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={() => { navigate('/mesas') }}
                    >
                        <IoRestaurant size={35} color={'#FFF'} />
                        <span className={styles.text}>
                            Mesas
                        </span>
                    </Button>
                </li>
                <li className={styles.menuItem}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={() => { navigate('/historicoVendas') }}
                    >
                        <FaBook size={35} color={'#FFF'} />
                        <span className={styles.text}>
                            Histórico
                        </span>
                    </Button>
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
        marginRight: 20,
    },
    link: {
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