import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useState } from 'react'
import { Navigate } from 'react-router'

const Register = () => {

    const{user,loading,handleRegister} =useAuth()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

   const handleSubmit = async(e)=>{
   e.preventDefault()
    await handleRegister(email,username,password)
    console.log("registered successfully")
    navigate('/feed')
    }

    if(loading){
        return <main><h1>Loading...</h1></main>
    }

  return (
    <main>
        <div className="form-container">
            <form onSubmit={handleSubmit} >
                <h1>Register</h1>
                <input 
                onInput={(e)=>{setEmail(e.target.value)}}
                type="email" 
                name='email' 
                placeholder='enter email' 
                id='email' />

                <input 
                onInput={(e)=>{setUsername(e.target.value)}}
                type="text" 
                name='username' 
                placeholder='enter username' 
                id='username' />

                <input onInput={(e)=>{setPassword(e.target.value)}}
                 type='password'
                 name='password'
                 placeholder='enter password'
                 id='password' />

                <button>Register</button>    
            </form>
            <p>Already have an account? <Link className='toggleAuthForm' to={'/login'}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register