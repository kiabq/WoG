// Libraries
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Hooks
import { useAuth } from "./useProvider";

const useAccount = () => {
    const [error, setError] = useState<string>();
    const [user, setUser] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [avatar, setAvatar] = useState<string>();
    const [availability, setAvailability] = useState<Array<object> | null>();
    const auth = useAuth();

    useEffect(() => {
        // Used to abort in case of failed API call and/or effect cleanup.
        const controller = new AbortController;
        const signal = controller.signal;
        setError(undefined);

        let url = `${process.env.REACT_APP_BACKEND_URL}/api/users/me?populate[0]=*&populate[1]=user_availability.day`;

        let config = {
            signal: signal,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                setUser(res?.data.username);
                setEmail(res?.data.email);
                setAvatar(`https://cdn.discordapp.com/avatars/${res?.data.providerId}/${res?.data.avatar}.png`);
                setAvailability(res?.data.user_availability?.day);
            }
        )
        .catch((err) => {
            if (err.code === "ECONNABORTED") {
                console.log("Error Aborted")
            } else {
                console.log(err);
            }
        })

        return () => {
            controller.abort();
        }
    }, []);

    return {  
        error,
        user,
        email,
        avatar,
        availability
    }
}

export default useAccount;