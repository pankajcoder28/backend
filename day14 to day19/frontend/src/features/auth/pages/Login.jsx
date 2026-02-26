import React from 'react'
import "./style/form.scss"
import { Link } from 'react-router'
import axios from 'axios'
import { useState } from "react"

const login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleform(e) {
    e.preventDefault()

    await axios.post('http://localhost:3000/api/auth/login',{
      username,password
  },{
    withCredentials:true
  }).then(res =>{
    console.log(res.data)
  })
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
      <form onSubmit={handleform}>
        <input onInput={(e)=>{setUsername(e.target.value)}} type="text " name='username' placeholder='enter username' />
        <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name="password" placeholder='enter your password'/>
        <button>login</button>
      </form>
      <p>dont have an account? <Link className='toggleAuthForm' to={'/register'}>Register</Link> </p>
      </div>
    </main>
  )
}

export default login
