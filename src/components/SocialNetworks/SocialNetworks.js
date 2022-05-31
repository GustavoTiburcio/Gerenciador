import React from 'react';
import { FaFacebookSquare, FaInstagram, FaYoutubeSquare, FaSpotify } from "react-icons/fa";


const SocialNetworks = () => (
    <nav>
        <ul style={styles.menuList}>
            <li style={styles.menuItem}>
                <a target="_blank" rel="noreferrer noopener" href="https://www.facebook.com/ecoalternativamga/">
                    <FaFacebookSquare size={35} color="white" />
                </a>
            </li>
            <li style={styles.menuItem}>
                <a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/ecoalternativamaringa/">
                    <FaInstagram size={35} color="white" />
                </a>
            </li>
            <li style={styles.menuItem}>
                <a target="_blank" rel="noreferrer noopener" href="https://www.youtube.com/channel/UCvtwhKHSxCxdduDG7d6nL8A">
                    <FaYoutubeSquare size={35} color="white" />
                </a>
            </li>
            <li style={styles.menuItem}>
                <a target="_blank" rel="noreferrer noopener" href="https://open.spotify.com/show/4FoINqvZAlZSnMwZScjPx1">
                    <FaSpotify size={35} color="white" />
                </a>
            </li>
        </ul>
    </nav>
)

const styles = {
    menuList: {
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none',
        justifyContent: 'flex-end'
    },
    menuItem: {
        margin: '0.5%'
    },
}


export default SocialNetworks