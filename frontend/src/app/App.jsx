import { routes } from './app.routes.jsx'
import { RouterProvider } from 'react-router'
import { useAuth } from '../features/auth/hook/useAuth.js'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function App() {

  const {handleGetMe}= useAuth()

    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    
    useEffect(()=>{
      handleGetMe()
    },[])

  return (
    <>
    <RouterProvider router = {routes}/>
    
    </>
  )
}

export default App
