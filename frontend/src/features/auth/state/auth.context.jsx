import { createContext, useEffect, useState } from "react";
import { getMe } from "../services/auth.api";


export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

     useEffect(() => {
        const checkUser = async () => {
            try {
                const response = await getMe();

                console.log("GET ME RESPONSE:", response);

                if (response?.success) {
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log("GET ME ERROR:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >{children}</AuthContext.Provider>
    )
}