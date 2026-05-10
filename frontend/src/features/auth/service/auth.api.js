import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true    
})

export async function register({email,fullname,password,contact,role}) {
    const response = await authApiInstance.post('/register',{
        email,
        fullname,
        password,
        contact,
        role
    })
    return response.data
}

export async function login({email,password}){
    const response = await authApiInstance.post('/login',{email,password})
    return response.data
}

export async function getMe(){
    const response = await authApiInstance.get('/me')
    return response.data
}
