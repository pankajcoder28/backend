import{login,register , getMe , logout} from '../services/auth.api'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../auth.context'


export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const{user,loading ,setLoading,setUser} = context

    async function handleRegister({username ,email,password}) {
        setLoading(true)
        const data = await register({username,email,password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({ username,email,password}) {
        setLoading(true)
        const data = await login({username,email,password})
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetme() {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout() {
        setLoading(true)
        const data = await logout()
        setUser(data.user)
        setLoading(false)
    }

     useEffect(()=>{
        handleGetme()
    },[])
    return{
        user,loading,handleLogin,handleLogout,handleRegister,handleGetme
    }
}