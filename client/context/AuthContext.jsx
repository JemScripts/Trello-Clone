import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/user.service.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = userService.getUser();

        if(storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = async (email, password) => {
        const data = await userService.login(email, password);

        setUser(data.user);

        return data;
    };

    const logout = () => {
        userService.logout();
        setUser(null);
    };

    const value = {
        login,
        logout,
        user
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}