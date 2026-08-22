import { useContext, useEffect } from "react";
import { signIn, signOut, signUp, getMe, updateProfile } from "../services/auth.api";
import { AuthContext } from "../state/auth.context";


export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    // sign up handler
    const signUpHandler = async (data) => {
        setLoading(true);

        try {
            const response = await signUp(data);
            const user = response?.data;

            if (!user) {
                throw new Error("User data not found in response.");
            }

            // set data in to context state
            setUser(user?.user);

            return {
                success: response?.success,
                message: response?.message,
                user,
            };

        } catch (error) {
            setLoading(false)
            return {
                success: error.response?.success,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            };
        } finally {
            setLoading(false);
        }
    };


    // sign in handler 
    const signInHandler = async (data) => {
        setLoading(true);
        try {
            const response = await signIn(data);
            const userData = response?.data;
            // console.log("response",response.data.user.email);
            if (!userData) {
                throw new Error("User not found in hanlder")
            };

            // set data into context
            setUser(userData?.user)

            return {
                success: response?.success,
                message: response?.message,
                userData,
            };


        } catch (error) {
            setLoading(false)
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            };

        } finally {
            setLoading(false)
        }
    };

    // sign out 
    const signOutHandler = async () => {
        setLoading(true)
        try {
            const response = await signOut();

            if (!response?.success) {
                throw new Error(response?.message)
            };

            // set user null
            setUser(null)
            return {
                success: response?.success,
                message: response?.message,
            }

        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            };
        } finally {
            setLoading(false)
        }
    };


    // getme handler
    const getMeHandler = async () => {
        setLoading(true);

        try {
            const response = await getMe();
            const user = response.data;

            if (!response?.success) {
                throw new Error("User not found")
            };
            // save into state
            setUser(user);

            return ({
                success: response?.success,
                message: response?.message,
                user
            })


        } catch (error) {

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            };

        } finally {
            setLoading(false);
        }
    };

    // update user  profile

    const updateUserProfileHandler = async (data) => {
        setLoading(true);

        try {
            const response = await updateProfile(data);
            const user = response.data;

            if (response?.success) {
                setUser(response.data);
            };

            return {
                success: response?.success,
                message : response?.message,
                user
            };

        } catch (error) {
            setLoading(false)
            return {
                success: error.response?.success,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            };
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, signUpHandler, signInHandler, signOutHandler, getMeHandler, updateUserProfileHandler }

};