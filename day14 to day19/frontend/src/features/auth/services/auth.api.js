import axios from 'axios'

const api = axios.create({
    baseURL: 'https://insta-clone-00t4.onrender.com/api/auth',
    withCredentials:true
})

export async function login(username,password){
    const response = await api.post('/login',{
        username,
        password
    })
    return response.data
}

export async function register(email,username,password){
    const response = await api.post('/register',{
        email,
        username,
        password
    })
    return response.data
}

export async function getme(){
    const response = await api.get('/get-me')
    return response.data
}