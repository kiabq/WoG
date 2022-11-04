// Libraries
import React, { ReactNode, useState, useLayoutEffect, useEffect, createContext, useContext } from "react";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

interface ContextType {
    token: string | null,
    user: string | null,
    login: (t: string, u: string) => void,
    logout: () => void,
    checkLogin: () => boolean
}

const AuthCtx = createContext<ContextType | null>(null)

function localStorageSetter(token: string, user: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
}

function localStorageCleanup() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export const AuthContext = ({ children }: { children: ReactNode }) => {
    const auth = useProvideAuth();

    return (
        <AuthCtx.Provider value={auth}>
            {children}
        </AuthCtx.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthCtx);
}

export const useProvideAuth = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(localStorage.getItem('user'));

    const login = (t: string, u: string) => {
        // t: Auth token
        // u: user(name)
        localStorageSetter(t, u);
        setToken(t);
        setUser(u);
    };

    const logout = () => {
        localStorageCleanup();
        setUser(null);
        setToken(null);
    };

    // Add a way to check token:
    // if user is logged in for more than 15d to 30d, token may expire, this needs to be checked.
    const checkLogin = () => {
        let checkT = localStorage.getItem('token');
        let checkU = localStorage.getItem('user');

        if (checkT !== token || checkU !== user) {
            logout();
            return false;
        }

        return true;
    }

    return {
        token,
        user,
        login,
        logout,
        checkLogin,
    };
}

export const PublicRoute = () => {
    const auth = useAuth();

    return (auth?.user && auth?.token ? <Navigate to='/'/> : <Outlet/>);
}

export const PrivateRoute = () => {
    const auth = useAuth();
    auth?.checkLogin();

    return (auth ? <Outlet/> : <Navigate to='/'/>);
}