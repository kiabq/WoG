// Libraries
import React, { ReactNode, useState, useEffect, useLayoutEffect, useContext, createContext, useRef } from "react";
import axios from "axios";

// Hooks
import { useAuth } from "./useProvider";

// Types
import { AccountType } from "../Components/Accounts/types";

const AccountCtx = createContext<any>(null);

const INITIAL_STATE = {
    error: undefined,
    user: undefined,
    email: undefined,
    avatar: undefined,
    availability: undefined
}

export const AccountContext = ({ children }: { children: ReactNode }) => {    
    const [data, setData] = useState<AccountType>(INITIAL_STATE);
    
    const [error, setError] = useState<String>();
    const auth = useAuth();

    useEffect(() => {
        setError(undefined);

        const controller = new AbortController;
        const signal = controller.signal;

        let url = `${process.env.REACT_APP_BACKEND_URL}/api/users/me?populate[0]=*&populate[1]=user_availability.day`;

        let config = {
            signal: signal,
            headers: {
                'Authorization': `Bearer ${auth.token}`
            }
        }

        axios.get(url, config)
        .then((res) => {
            if (res.statusText === 'OK') {
                return res;
            }
        })
        .then(
            (res) => {
                // TODO: Reformat response to a more readable format.
                setData({
                    error: undefined,
                    user: res?.data.username, 
                    email: res?.data.email, 
                    avatar: `https://cdn.discordapp.com/avatars/${res?.data.providerId}/${res?.data.avatar}.png`,
                    availability: { 
                        id: res?.data.user_availability.id, days: res?.data.user_availability?.day 
                    }
                })
            }
        )
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST") {
                auth.logout();
            } else if (err.code === "ECONNABORTED" || "ERR_CANCELED") {
                // Error Handling Logic
            } else {
                // Error Handling Logic
            }
        })

        return (() => {
            controller.abort();
        })
    }, [auth]);

    return (
        <AccountCtx.Provider value={data}>
            {children}
        </AccountCtx.Provider>
    )
}

export const useAcct = () => {
    return useContext(AccountCtx);
}
