import React from 'react'
import Menu from '../Menu/Menu'
import SocialNetworks from '../SocialNetworks/SocialNetworks';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { GiFullPizza } from "react-icons/gi";


const Header = () => {
    const styles = useStyles();
    return (
        <header className={styles.header}>
            {/* <div className={styles.headerBarTop}>
                <SocialNetworks />
            </div> */}
            <header className={styles.headerBarBottom}>
                <div className={styles.headerLogo}>
                    <Link to="/" className={styles.logoText}>
                        {/* <h3><GiFullPizza size={'medium'}/></h3> */}
                        <h3>Gerenciador</h3>
                    </Link>
                </div>
                <Menu />
            </header>
        </header>
    )
}

const useStyles = makeStyles({
    header: {
        width: '100%',
    },
    headerBarTop: {
        backgroundColor: '#da5c5c',
    },
    headerBarBottom: {
        alignItems: 'center',
        background: '#da5c5c',
        display: 'flex',
        justifyContent: 'space-between',
        // flexDirection: 'row'
    },
    Logo: {
        //color: '#fff'
    },
    headerLogo: {
        width: '5%',
        marginLeft: '2%',
        display: 'flex',
        flexDirection: 'row'
    },
    logoText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFF',
        textDecoration: 'none',
    }
});

export default Header