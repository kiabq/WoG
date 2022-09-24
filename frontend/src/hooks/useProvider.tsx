// Libraries
import React, { ReactNode, useState, useEffect, createContext, useContext } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

const AuthCtx = createContext<any>(null)

function Login(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
}

function Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export const ProvideAuth = ({ children }: { children: ReactNode }) => {
    const auth = useProvideAuth();
    
    return (
        <AuthCtx.Provider value={auth}>
            {children}
        </AuthCtx.Provider>
    );
}

export const ConsumeAuth = ({ children }: { children: () => ReactNode }) => {
    return (
        <AuthCtx.Consumer>
            {children}
        </AuthCtx.Consumer>
    );
}

export const useAuth = () => {
    return useContext(AuthCtx);
}

export const useProvideAuth = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(localStorage.getItem('user'));

    const login = (t: string, u: string) => {
        Login(t, u);
        setToken(t);
        setUser(u);
    };

    const logout = () => {
        Logout();
        setUser(null);
        setToken(null);
    };

    const checkLogin = () => {
        let checkT = localStorage.getItem('token');
        let checkU = localStorage.getItem('user');

        if (checkT != token || checkU != user) {
            Logout();
            setUser(null);
            setToken(null);
        }
    }

    return {
        token,
        user,
        login,
        logout,
        checkLogin
    };
}

export const PublicRoute = () => {
    let auth = useAuth();

    return (auth.user && auth.token ? <Navigate to='/'/> : <Outlet/>);
}

export const PrivateRoute = () => {
    let auth = useAuth();
    auth.checkLogin();

    return (auth ? <Outlet/> : <Navigate to='/'/>);
}