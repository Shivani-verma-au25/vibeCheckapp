import {createBrowserRouter} from 'react-router-dom';
import Signin from '../features/auth/pages/Signin';
import Signup from '../features/auth/pages/Signup';

const router = createBrowserRouter([
    {
        path:'/',
        element : <h1>Home</h1>
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