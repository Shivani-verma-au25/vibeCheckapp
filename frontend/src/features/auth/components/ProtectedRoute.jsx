import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user , loading} = useAuth();

    // if loading is true show loading 
    if(loading){
        return <h1>Loading .....</h1>
    };

    // if user is not logged in fallbacke to sign-in page
    if( !user ){
        return <Navigate to='/sign-in'  replace/>
    };

  return children
}

export default ProtectedRoute;