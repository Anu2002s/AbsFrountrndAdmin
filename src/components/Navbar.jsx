import React, { useContext } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  return (
    <div className="flex items-center justify-between border bg-black border-slate-700 px-6 py-4 text-white text-sm max-md:w-full">
      {/* Left side logo */}
      <a href="https://prebuiltui.com" className="flex items-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
          <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
        </svg>
      </a>

      {/* Right side logout button */}
      <div className="flex items-center">
        <button
          onClick={logout}
          className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium
                     shadow-[0px_0px_30px_7px] hover:shadow-[0px_0px_30px_14px] 
                     hover:shadow-white/50 shadow-white/50 hover:bg-slate-100 transition duration-300"
        >
          LogOut
        </button>
      </div>
    </div>
  )
}

export default Navbar
