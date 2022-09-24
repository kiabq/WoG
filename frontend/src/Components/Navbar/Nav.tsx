// Libraries
import React, { useState, useEffect, useRef, FunctionComponent } from "react";
import { Link } from "react-router-dom";

// Styles
import globals from '../../globals.module.css';
import styles from './Nav.module.css';

// Hooks
import { useAuth } from "../../hooks/useProvider";
import useAccount from "../../hooks/useAccount";

const Authed = () => {
    const [style, setStyle] = useState<boolean>(false);
    const refTest = useRef(null);
    const auth = useAuth();
    const accountInfo = useAccount();

    function logout() {
        auth.logout();
    }

    function closeModal() {
        setStyle(false);
    }

    return (
        <>
            { style && <div className={styles.modal} onClick={() => closeModal()}/>}
            
            <div className={`${styles.nav__hamburger}`}>

                <div className={`${styles.nav__account}`} onClick={() => {setStyle(!style)}}>
                    <div className={styles.nav__account_info}>
                        <img src={accountInfo.avatar} className={styles.nav__account_pfp}/>
                        <p>{accountInfo.user}</p>
                    </div>
                    <button className={`${globals.btn} ${styles.nav__dropdown_button}`}>
                        <p className={`${styles.nav__dropdown_button_inner} ${style ? styles.animate : ''}`}>{'>'}</p>
                    </button>
                </div>

                <div className={`${styles.nav__dropdown} ${style ? styles.nav__dropdown_visible : '' }`}>
                    <Link to='/account'>
                        <button className={`${globals.btn} ${styles.nav__dropdown_element}`}>
                            Account
                        </button>
                    </Link>
                    <button className={`${globals.btn} ${styles.nav__dropdown_element}`} onClick={() => {logout()}}>
                        Logout
                    </button>
                </div>

            </div>
        </>
    )
}   

const NotAuthed = () => {
    return (
        <div className={styles.nav__buttons}>
            <a href={`${process.env.REACT_APP_BACKEND_URL}/api/connect/discord`}>
                <button className={`${globals.btn} ${styles.nav__controls__btn}`}>Login with Discord</button>
            </a>
        </div>
    )
}

const Nav = () => {
    let auth = useAuth();
    
    return (
        <header className={styles.nav}>
            <div className={styles.nav__container}>
                <div className={styles.nav__info}>
                    <p>Logo</p>
                </div>
                <div className={styles.nav__controls}>
                    {(auth.token && auth.user) && <Authed />}
                    {(!auth.token && !auth.user) && <NotAuthed />}
                </div>
            </div>
        </header>
    )
}

export default Nav;