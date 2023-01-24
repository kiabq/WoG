// Libraries
import React, { ReactNode, useState, useEffect, useContext, createContext } from "react";
import axios, { AxiosResponse } from "axios";

// Hooks
import { useAuth } from "./useProvider";

// Types
import { AccountType } from "../utils/types";

interface AccountContextInterface {
    accountInfo: AccountType,
    setAccountInfo: React.Dispatch<React.SetStateAction<AccountType>>,
    triggerUpdate: () => void
}

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#extended-example
const AccountCtx = createContext<AccountContextInterface>({} as AccountContextInterface);

export const AccountContext = ({ children }: { children: ReactNode }) => {    
    const acct = useFetchAcctHook();

    return (
        <AccountCtx.Provider value={acct}>
            {children}
        </AccountCtx.Provider>
    )
}

export const useAcct = () => {
    return useContext(AccountCtx);
}
 
const INITIAL_STATE = {
    error: undefined,
    user: undefined,
    email: undefined, // Related to Dicord Account.
    avatar: undefined,
    availability: undefined,
    user_info: undefined,
    optional: null,
}

export const useFetchAcctHook = () => {
    const [accountInfo, setAccountInfo] = useState<AccountType>(INITIAL_STATE);
    const [update, setUpdate] = useState<boolean>(false);
    const [error, setError] = useState(undefined);
    const auth = useAuth();

    const triggerUpdate = () => {
        setUpdate(!update);
    }

    useEffect(() => {
        setError(undefined);

        const controller = new AbortController;
        const signal = controller.signal;

        // Get user profile (move to ENV variable).
        const url = `${process.env.REACT_APP_BACKEND}/api/users/me`;

        const config = {
            signal: signal,
            headers: {
                "Authorization": `Bearer ${auth?.token}`
            }
        }

        axios.get(url, config)
        .then((res) => {
            if (res.statusText === "OK") {
                return res;
            }
        })
        .then(
            (res) => {
                const availablilityInfo = res?.data.user_availability;
                const userInfo = res?.data.user_info;
                const optionalUserInfo = res?.data.optionalQuestions;

                setAccountInfo({
                    error: undefined,
                    user: res?.data.username, 
                    email: res?.data.email, 
                    avatar: `https://cdn.discordapp.com/avatars/${res?.data.providerId}/${res?.data.avatar}.png`,
                    availability: { 
                        id: availablilityInfo?.id, days: availablilityInfo?.day
                    },
                    user_info: {
                        name: userInfo?.name,
                        invoiceEmail: userInfo?.invoiceEmail,
                        age: userInfo?.age,
                        pronoun: userInfo?.pronoun
                    },
                    optional: optionalUserInfo || null,
                });
            }
        )
        .catch((err) => {
            if (err.code === "ERR_BAD_REQUEST" || err.status === 401) {
                auth?.logout();
            } else if (err.code === "ECONNABORTED" || "ERR_CANCELED") {
                // Error Handling Logic
            } else {
                // Error Handling Logic
            }
        })

        return (() => {
            controller.abort();
        });
    }, [auth, update]);

    return ({
        accountInfo,
        setAccountInfo,
        triggerUpdate
    })
}

export function triggerAccountUpdate(res: AxiosResponse<any, any> | void, account: AccountContextInterface) {
    // Narrow response type
    if (res && res.status === 200) {
        account.triggerUpdate();
    }
}
