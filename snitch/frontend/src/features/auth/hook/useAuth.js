import { useDispatch } from "react-redux";
import { register } from "../service/auth.api";
import { setUser,setLoading,setError } from "../state/auth.slice";

const useAuth = ()=>{
    const dispatch = useDispatch()

    async function handleRegister({email,fullname,password,contact,role}){
        
       const data= await register({email,fullname,password,contact,role})

       dispatch(setUser(data.user))
       
    }

    return{handleRegister}
}