import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import { useState } from 'react'

const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleForm(e) {
    e.preventDefault()

    await axios.post('http://localhost:3000/api/auth/register',{
      username,password,email
    },{
      withCredentials:true
    }).then(res =>{
      console.log(res.data)
    })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleForm} >
          <input onInput={(e)=>{setEmail(e.target.value)}} type="text" name='email' placeholder='enter your email' />
          <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='enter your username' />
          <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name='password' placeholder='enter your password' />
          <button>Register</button>
        </form>
        <p>already have an account? <Link className='toggleAuthForm' to={'/login'}>Login</Link> </p> 
      </div>
    </main>
  )
}

export default Register
