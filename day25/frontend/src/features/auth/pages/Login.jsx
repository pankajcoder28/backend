import React from 'react'
import '../style/login.scss'
import Formgroup from '../components/Formgroup'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const {loading , handleLogin} = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin({username,email,password})
    navigate('/')
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
          <Formgroup onChange={(e)=>{setEmail(e.target.value)}} value={email} labels= "email" placeholder= "enter your email or username"/>
          <Formgroup onChange={(e)=>{setPassword(e.target.value)}} value={password} labels= "password" placeholder= "enter your password"/>
          <button type='submit'>Login</button>
        </form>
        <p>Don't have an account?<Link className='togglelink' to = {'/register'}>Register</Link></p>
      </div>
    </main>
  )
}

export default Login
