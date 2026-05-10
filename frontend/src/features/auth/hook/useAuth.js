import { useDispatch } from "react-redux";
import { register,login, getMe } from "../service/auth.api";
import { setUser,setLoading,setError } from "../state/auth.slice";


export const useAuth = ()=>{
    const dispatch = useDispatch()

    async function handleRegister({email,fullname,password,contact,role}){
        
       const data= await register({email,fullname,password,contact,role})

       dispatch(setUser(data.user))
       return data.user
       
    }
    
    async function handleLogin({email,password}) {
        const data = await login({email,password})
        
        dispatch(setUser(data.user))
        return data.user
    }
    
    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(err){
            console.log(err)
        }finally{
            dispatch(setLoading(false))
        }
 
    }

    return{handleRegister,handleLogin,handleGetMe}
}


