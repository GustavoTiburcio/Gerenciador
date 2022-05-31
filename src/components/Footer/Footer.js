import React from 'react'

const Footer = () => (
    <footer style={styles.footer}>
        <></>
        <span style={styles.footerMessage}>
            Desenvolvido por Gustavo Tiburcio
        </span>
    </footer>
)

const styles = {
    footer: {
        bottom: 0,
        background: '#263238',
        textAlign: 'center',
        left: 0,
        position: 'fixed',
        width: '100%',
        height: '2em',
        verticalAlign: 'center'

    },
    footerMessage: {
        color: '#FFF',
        fontFamily: 'sans-serif',
    }
}
export default Footer