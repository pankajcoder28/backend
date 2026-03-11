import{createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Protect from './features/auth/components/protected'
import FaceExpression from './features/expression/components/FaceExpression'
import Player from './features/home/components/player'

export const router = createBrowserRouter([{
  path : '/login',
  element : <Login/>
},{
    path:'/register',
    element:<Register/>
},{
  path: '/',
  element : <Protect><FaceExpression><Player></Player></FaceExpression></Protect>
}])



