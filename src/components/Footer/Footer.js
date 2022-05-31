import React from 'react'

const Footer = () => (
    <footer style={styles.footer}>
        <span style={styles.footerMessage}>
            Desenvolvido por Gustavo Tiburcio
        </span>
    </footer>
)

const styles = {
    footer: {
        background: '#263238',
        textAlign: 'center',
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
    },
    footerMessage: {
        color: '#FFF',
        fontFamily: 'sans-serif',
    }
}
export default Footer