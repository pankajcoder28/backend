import React from 'react'
import Formgroup from '../components/Formgroup'
import { Link, useNavigate } from 'react-router'
import '../style/register.scss'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Register = () => {

  const{ handleRegister} = useAuth()
  const navigate = useNavigate()
 
  const [username, setUsername] = useState("") 
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate('/')
  }

  return (
    <main className="register-page">
        <div className="form-container">
          <h1>Register</h1>
        <form onSubmit={handleSubmit} >
          <Formgroup onChange={(e)=>{setUsername(e.target.value)}} value={username} labels= "name" placeholder= "enter your name"/>
          <Formgroup onChange={(e)=>{setEmail(e.target.value)}} value={email} labels= "email" placeholder= "enter your email"/>
          <Formgroup onChange={(e)=>{setPassword(e.target.value)}} value={password} labels= "password" placeholder= "enter your password"/>
          <button type='submit'>Register</button>
        </form>
        <p>already have an account <Link className='togglelink' to={'/login'}>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
