// Libraries
import React, { ReactElement, createContext, useContext, useState } from "react";

// Types
import { IUser } from "@/utils/types";

const UserContext = createContext<IProps>({} as IProps);

interface IProps {
    user: IUser,
    setAccount?: React.Dispatch<React.SetStateAction<IUser>>,
    children?: ReactElement[]
}

export default function UserCtx({ user: account, children }: IProps) {
    const [user, setAccount] = useState(account);

    return (
        <UserContext.Provider value={{ user, setAccount }}>
            {children}
        </UserContext.Provider>
    )
}

export function getContext() {
    return useContext(UserContext);
}