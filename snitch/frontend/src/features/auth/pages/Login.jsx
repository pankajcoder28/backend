import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hook/useAuth.js';
import {useNavigate} from 'react-router-dom'
import Continuewithgoogle from '../components/Continuewithgoogle.jsx';


const Login = () => {
  const {handleLogin} = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     await handleLogin({
      email: formData.email,
      password: formData.password
     })
     navigate("/")
     
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-[Inter] flex flex-col md:flex-row">
      
      {/* Left Data Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-24 overflow-y-auto relative z-20">
        <div className="w-full max-w-md mx-auto space-y-12">
          
          {/* Brand Logo / Text */}
          <div className=" text-3xl font-bold tracking-widest font-[system-ui] text-[#facc15] uppercase">
            SNITCH.
          </div>

          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white font-[system-ui]">
              Welcome <br /> Back
            </h1>
            <p className="text-base lg:text-lg text-[#d1c6ab] font-light font-[system-ui]">
              Enter your details to access your account.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#d1c6ab] ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl lg:rounded-2xl px-4 py-3 lg:px-5 lg:py-4 text-sm lg:text-base focus:outline-none focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] transition-all placeholder-[#4d4632] text-white"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2 group relative">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] uppercase tracking-widest text-[#d1c6ab]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[10px] uppercase tracking-widest text-[#facc15] hover:text-[#ffecb9] transition-colors">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl lg:rounded-2xl px-4 py-3 lg:px-5 lg:py-4 text-sm lg:text-base focus:outline-none focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] transition-all placeholder-[#4d4632] text-white"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 lg:h-14 bg-linear-to-br from-[#ffecb9] to-[#facc15] text-[#231b00] font-semibold tracking-wide rounded-full hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all flex items-center justify-center transform active:scale-[0.98] mt-4 font-[system-ui]"
            >
              Sign In
            </button>
          </form>
            <Continuewithgoogle/>
          {/* Footer Link */}
          <div className="text-center pt-4">
            
            <p className="text-[#a19a8a] text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#facc15] hover:text-[#ffecb9] transition-colors font-semibold font-[system-ui]">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Desktop Hero Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-[55%] xl:w-[60%] relative bg-[#0e0e0e] overflow-hidden">
        {/* Dark subtle gradient overlay to blend perfectly with left column */}
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-[#131313] to-transparent z-10 pointer-events-none"></div>
        {/* Soft edge darkening */}
        <div className="absolute inset-0 bg-black/20 z-0 mix-blend-multiply"></div>
        
        <img 
          src="/snitch_fashion_hero.png" 
          alt="Snitch High Fashion Platform" 
          className="w-full h-full object-cover object-center opacity-90 scale-105"
        />
        
        {/* Branding text overlay on image */}
        <div className="absolute bottom-12 right-12 z-20 text-right opacity-80 pointer-events-none">
          <h2 className="text-white text-3xl font-[Manrope] font-semibold tracking-widest uppercase">
            Define Your Vibe
          </h2>
          <p className="text-[#d1c6ab] mt-2 tracking-wide ">
            Lux streetwear curated for you.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;