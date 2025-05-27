import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>OffCode</h1>
        </header>
    );
};

const styles = {
    header: {
        background: '#222',
        color: '#fff',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        margin: 0,
        fontSize: '2rem'
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '24px',
        margin: 0,
        padding: 0
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem'
    }
};

export default Header;