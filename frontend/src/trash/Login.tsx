import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { ConsumeAuth, useAuth } from "../../hooks/useProvider";
import axios from "axios";
import globals from '../../globals.module.css';
import styles from './UserForms.module.css';

const Login = () => {
    const navigate = useNavigate();
    // const auth = useAuth();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        // Type Casting
        // https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
        
        // Expression of type ... can't be used to index.
        // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
        let username = (e.target[0 as keyof void] as HTMLInputElement).value;
        let password = (e.target[1 as keyof void] as HTMLInputElement).value;

        axios.post('http://localhost:1337/api/auth/local', {
            'identifier': username,
            'password': password
        })
        .then((res) => {
            if (res.status === 200) {
                return res;
            }
        })
        .then((res) => {
            if (res != undefined) {
                // auth.login(res.data.jwt, res.data.user.username);
            } else {
                throw new Error('Request is undefined');
            }
        })
        .catch((err) => {
            console.log('Error Occurred: ', err);
        });
    } 

    return (
        <div className={`${styles.login}`}>
            <form className={`${styles.login__form}`} onSubmit={(e) => { handleSubmit(e) }}>
                <input className={`${styles.login__form__input}`} type='text' placeholder='username'/>
                <input className={`${styles.login__form__input}`} type='password' placeholder='password'/>
                <button className={`${globals.btn}`} type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Login;