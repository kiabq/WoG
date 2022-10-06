// Libraries
import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

// Components
import AccountForms from "./AccountForms";

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
                <div>
                    <p>Account for: {accountInfo.user}</p>
                    <p>Email: {accountInfo.email}</p>
                    <img src={accountInfo.avatar} />
                    <a href='https://discord.gg/75MuBBptxB'>Join Discord</a>
                </div>

                <h2>Account Info</h2>
                <div>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A explicabo, cupiditate ducimus cum ipsa qui.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque possimus enim, minima corrupti nesciunt odit saepe reprehenderit asperiores voluptas optio? Nemo perspiciatis veniam nobis, odit sint enim hic ullam ipsam architecto mollitia! Aliquam officiis earum exercitationem porro tempora minus qui, quibusdam explicabo fugit perspiciatis architecto et, ducimus vitae at laudantium.</p>
                    </div>
                    <AccountForms account={accountInfo}/>
                </div>
            </div>
        )
    } else {
        return (
            <Navigate to='/' />
        )
    }
}

export default Account;