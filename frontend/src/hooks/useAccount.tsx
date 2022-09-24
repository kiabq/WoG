// Libraries
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const useAccount = () => {
    const apiRef = useRef(true);
    const [error, setError] = useState<string>();
    const [user, setUser] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [avatar, setAvatar] = useState<string>();

    useEffect(() => {
        setError(undefined);

        if (apiRef.current) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                if (res.statusText === 'OK') {
                    return res;
                }
            })
            .then(
                (res) => {
                    if (res !== undefined) {
                        setUser(res.data.username);
                        setEmail(res.data.email);
                        setAvatar(`https://cdn.discordapp.com/avatars/${res.data.providerId}/${res.data.avatar}.png`);
                    }
                }, 
                (err) => {
                    setError(err.message)
                }
            )

            apiRef.current = false;
        }
    }, []);

    return {  
        error,
        user,
        email,
        avatar
    }
}

export default useAccount;