import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hook/useAuth.js';
import {useNavigate} from 'react-router-dom'
import Continuewithgoogle from '../components/Continuewithgoogle.jsx';

const Register = () => {
  const {handleRegister} = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    password: '',
    isSeller: false,
  });
 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      email: formData.email,
      fullname: formData.fullName,
      password: formData.password,
      contact: formData.contactNumber,
      role: formData.isSeller
    })
    
    navigate("/")
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-[Inter] flex flex-col md:flex-row">
      
      {/* Left Data Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 md:px-16 lg:px-24 overflow-y-auto relative z-20">
        <div className="w-full max-w-md mx-auto space-y-12">
          
          {/* Brand Logo / Text (Optional) */}
          <div className=" text-3xl font-bold tracking-widest text-[#facc15] uppercase font-[system-ui]">
            SNITCH.
          </div>

          {/* Header Section */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight font-[system-ui] text-white">
              Create <br /> Account
            </h1>
            <p className="text-base lg:text-lg text-[#d1c6ab]  font-[system-ui]">
              Join us to explore a seamless experience.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#d1c6ab] ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="full name"
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl lg:rounded-2xl px-4 py-3 lg:px-5 lg:py-4 text-sm lg:text-base focus:outline-none focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] transition-all placeholder-[#4d4632] text-white"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[#d1c6ab] ml-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91 55555 55555"
                className="w-full bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl lg:rounded-2xl px-4 py-3 lg:px-5 lg:py-4 text-sm lg:text-base focus:outline-none focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] transition-all placeholder-[#4d4632] text-white"
                required
              />
            </div>

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
              <label className="text-[10px] uppercase tracking-widest text-[#d1c6ab] ml-1 ">
                Password
              </label>
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

            {/* Is Seller Flag */}
            <div className="flex items-center space-x-3 ml-1 pt-1 pb-4">
              <label className="relative flex cursor-pointer items-center rounded-full ">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="peer relative h-5 w-5 lg:h-6 lg:w-6 cursor-pointer appearance-none rounded-md border border-[#4d4632] transition-all checked:border-[#facc15] checked:bg-[#facc15] hover:shadow-[0_0_10px_rgba(250,204,21,0.2)]"
                />
                <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#131313] opacity-0 transition-opacity peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 lg:h-4 lg:w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
              <span className="text-sm font-medium text-[#e5e2e1] font-[system-ui]">
                I want to register as a seller
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 lg:h-14 bg-linear-to-br from-[#ffecb9] to-[#facc15] text-[#231b00] font-semibold tracking-wide rounded-full hover:shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all flex items-center justify-center transform active:scale-[0.98] cursor-pointer mt-4 font-[system-ui]"
            >
              Create Account
            </button>
          </form>
            <Continuewithgoogle/>
          {/* Footer Link */}
          <div className="text-center pt-4">
            <p className="text-[#a19a8a] text-m">
              Already have an account?{' '}
              <Link to="/login" className="text-[#facc15] hover:text-[#ffecb9] transition-colors font-semibold font-[system-ui]">
                Log in
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
          <p className="text-[#d1c6ab] mt-2 tracking-wide">
            Lux streetwear curated for you.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register;