import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import globals from '../../globals.module.css';
import styles from './UserForms.module.css';

const Signup = () => {
    let navigate = useNavigate();
    const [error, setError] = useState<Error | AxiosError | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        try {
            let username = (e.target[0 as keyof void] as HTMLInputElement).value;
            let email = (e.target[1 as keyof void] as HTMLInputElement).value;
            let confirmEmail = (e.target[2 as keyof void] as HTMLInputElement).value;
            let pass = (e.target[3 as keyof void] as HTMLInputElement).value;
            let confirmPass = (e.target[4 as keyof void] as HTMLInputElement).value;
    
            if (email != confirmEmail || pass != confirmPass) {
                throw new Error('Email or Password does not match');
            }

            axios.post('http://localhost:1337/api/auth/local/register', {
                'username': username,
                'email': email,
                'password': pass
            })
            .then(
                (res) => {
                if (res.status === 200) {
                    setError(null);
                    navigate('/');
                    console.log('sent')
                    return res;
                }},
                (err) => {
                    if (err instanceof AxiosError) {
                        setError(err);
                    }
                }
            )
        } catch(err) {
            if (err instanceof Error) {
                setError(err);
            }
        }
    }

    return (
        <div className={styles.signup}>
            <form className={`${styles.signup__form}`} onSubmit={(e) => { handleSubmit(e) }}>
                <input className={`${styles.signup__form__input}`} placeholder="Username" required/>
                <input className={`${styles.signup__form__input}`} placeholder="Email" required/>
                <input className={`${styles.signup__form__input}`} placeholder="Confirm Email" required/>
                <input className={`${styles.signup__form__input}`} type='password' placeholder="Password" required/>
                <input className={`${styles.signup__form__input}`} type='password' placeholder="Confirm Password" required/>
                <button className={`${globals.btn}`}>Submit</button>
            </form>
        </div>
    )
}

export default Signup;