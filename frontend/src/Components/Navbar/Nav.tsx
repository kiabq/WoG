// Libraries
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./Nav.module.css";

// Hooks
import { useAuth } from "../../hooks/useProvider";
import { useAcct } from "../../hooks/useAccount";
import { useMobile } from "../../hooks/useMobile";

function useOutsideCheck(ref: React.MutableRefObject<any>) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleModalChange(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("click", handleModalChange);

        return () => { 
            document.removeEventListener("click", handleModalChange);
        }
    }, [ref])

    return { isOpen, setIsOpen };
}

const Authed = () => {
    const wrapperRef = useRef(null);
    const { accountInfo } = useAcct();
    const auth = useAuth();
    const isNavOpen = useOutsideCheck(wrapperRef);

    function logout() {
        auth?.logout();
    }

    return (
        <>
            <div className={`${styles.nav__hamburger}`} ref={wrapperRef}>
                <div className={`${styles.nav__account}`} onClick={() => isNavOpen.setIsOpen(!isNavOpen.isOpen)}>
                    <div className={styles.nav__account_info}>
                        <img src={accountInfo.avatar} className={styles.nav__account_pfp}/>
                        <p>{accountInfo.user}</p>
                    </div>
                    <button className={`${styles.nav__dropdown_button}`}>
                        <p className={`${styles.nav__dropdown_button_inner} ${isNavOpen.isOpen && styles.animate}`}>{'>'}</p>
                    </button>
                </div>  
                
                <div className={`${styles.nav__dropdown} ${isNavOpen.isOpen && styles.nav__dropdown_visible}`}>
                    <Link to='/account' className={styles.nav__dropdown__element}>
                        <button className={`${styles.nav__dropdown_element}`}>
                            Account
                        </button>
                    </Link>
                    <button className={`${styles.nav__dropdown_element}`} onClick={() => logout()} >
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
                <button className={``}>Sign-in with Discord</button>
            </a>
        </div>
    ) 
}

const Nav = () => {
    const auth = useAuth();

    return (
        <header className={`${styles.nav}`}>
            <div className={`${styles.nav__container} pd4`}>
                <div className={styles.nav__info}>
                    <Link to='/' className="rb_bld_h4">
                        WoG
                    </Link>
                </div>

                <div className={styles.nav__controls}>                    
                    {(auth?.token && auth?.user) && <Authed/>}
                    {(!auth?.token && !auth?.user) && <NotAuthed/>}
                </div>
            </div>
        </header>
    )
}

export default Nav;