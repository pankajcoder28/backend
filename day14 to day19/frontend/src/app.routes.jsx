import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Post from './features/post/pages/Feed'
import Createpost from './features/post/pages/Createpost'


export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/',
        element: <Register/>
    },
    {path:'/feed' , element: <Post/>},
    {path:'/createpost' , element: <Createpost/>}
])