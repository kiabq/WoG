// Libraries
import { IUser } from "@/utils/types";
import React, { Context, ReactElement, createContext, useContext } from "react";

const UserContext = createContext<IUser>({} as IUser);

interface IProps {
    user: IUser,
    children: ReactElement[]
}

export default function UserCtx({user, children}: IProps) {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export function getContext() {
    return useContext(UserContext);
}