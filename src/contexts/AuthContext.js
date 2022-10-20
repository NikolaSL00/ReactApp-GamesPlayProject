import { createContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from '../config/constants';

export const AuthContext = createContext({ user: {} });

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage(LOCAL_STORAGE_KEY, {});

    const userLogin = (authData) => {
        //there the access to the authState can be controlled
        // so we do not pass the pure setAuth to the Context
        // the change of the state of the app component should happen in the APP COMPONENT
        setAuth(authData);
    }
    const userLogout = () => {
        setAuth({});
    }
    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    );
}