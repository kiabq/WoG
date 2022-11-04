// Libraries
import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

// Components
import Nav from "../Navbar/Nav";
import AccountForms from "./AccountForms";

// Styles
import styles from './Account.module.css';
import globals from '../../globals.module.css';

// Hooks
import { useAuth } from "../../hooks/useProvider";
import { useAcct } from "../../hooks/useAccount";

// declare namespace Intl {
//     type Key = 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit';
  
//     function supportedValuesOf(input: Key): string[];
// }

// console.log(Intl.supportedValuesOf('timeZone'));

const Account = () => {
    const { accountInfo } = useAcct();
    const auth = useAuth();

    
    if (auth?.token && auth?.user && accountInfo.error === undefined) {
        return (
            <>
                <Nav/>
                <div className={`${styles.account} ${globals.pd6t}`}>
                    <AccountForms/>
                </div>
            </>
        )
    } else {
        return (
            <Navigate to='/'/>
        )
    }
}

export default Account;