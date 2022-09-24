// Libraries
import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

// Hooks
import { useAuth } from "../../hooks/useProvider";
import useAccount from "../../hooks/useAccount";


const Account = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const accountInfo = useAccount();

    if (auth.token && auth.user && accountInfo.error === undefined) {
        return (
            <div>
                <p>Account for: {accountInfo.user}</p>
                <p>Email: {accountInfo.email}</p>
                <img src={accountInfo.avatar} />
                <a href='https://discord.gg/75MuBBptxB'>Join Discord</a>
            </div>
        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default Account;