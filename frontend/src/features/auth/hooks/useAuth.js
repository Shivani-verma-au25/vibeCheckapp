import { useContext, useEffect } from "react";
import { signIn, signOut, signUp, getMe } from "../services/auth.api";
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
            success: response.success,
            message: response.message,
            userData,
        };


        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            };
            console.log("error sign in hadler", error);
            
        } finally {
            setLoading(false)
        }
    };

    // sign out 
    const signOutHandler = async () => {
        setLoading(true)
        try {
            const response = await signOut();
            console.log("res", response);

            if (!response?.data?.success) {
                throw new Error(response?.data?.message)
            };

            // set user null
            setUser(null)
            return{
                success : response?.success,
                message : response?.message,
            }

        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
            };
            console.log("error in handler" , error)
        }finally{
            setLoading(false)
        }
    };


    // getme handler
    const getMeHandler = async () =>{
        setLoading(true);

        try {
            const response = await getMe();
            const  user = response.data;

            if(!response?.success){
                throw new Error("User not found")
            };
            // save into state
            setUser(user);

            return({
                success : user?.success,
                message : user?.message,
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
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getMeHandler();
    },[])


    return {user, loading, signUpHandler , signInHandler , signOutHandler , getMeHandler}

};