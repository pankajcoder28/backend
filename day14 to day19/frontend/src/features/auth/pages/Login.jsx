import { useState } from 'react'
import '../style/form.scss'
import {Link, useNavigate} from 'react-router'
import { useAuth } from '../hook/useAuth'
import { Navigate } from 'react-router'

const Login = () => {

    const{user,loading ,handleLogin} = useAuth()
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
       e.preventDefault()
        await handleLogin(username,password)
        console.log("user logged in")
        navigate('/feed')
    }
    if(loading){
        return <main><h1>loading....</h1></main>
    }

  return (
    <main>
        <div className="form-container">
            <form onSubmit={handleSubmit} >
                <h1>Login</h1>
                <input 
                onInput={(e)=>{setUsername(e.target.value )}}
                type="text" 
                name='username' 
                placeholder='enter username' 
                id='username' />

                <input onInput={(e)=>{setPassword(e.target.value)}}
                 type='password'
                 name='password'
                 placeholder='enter password'
                 id='password' />

                <button>login</button>    
            </form>
            <p>dont have an account <Link className='toggleAuthForm' to={'/register'}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
