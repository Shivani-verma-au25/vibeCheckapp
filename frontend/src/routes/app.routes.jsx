import {createBrowserRouter} from 'react-router-dom';
import Signin from '../features/auth/pages/Signin';
import Signup from '../features/auth/pages/Signup';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import Home from '../features/home/pages/Home';

const router = createBrowserRouter([
    {
        path:'/',
        element : <ProtectedRoute><Home/></ProtectedRoute>
    },
    {
        path:"/sign-in",
        element : <Signin/>
    },
    {
        path : 'sign-up',
        element : <Signup/>
    }
])

export default router;