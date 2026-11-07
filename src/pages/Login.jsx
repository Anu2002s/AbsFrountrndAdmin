import React, { useContext, useState } from 'react'
import axios from 'axios'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import doctorImage from '../assets/doctor_image.jpg'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/login`,
          { email, password }
        )

        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
        } else toast.error(data.message)
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/login`,
          { email, password }
        )

        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
        } else toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
                    bg-gradient-to-br from-black via-gray-900 to-blue-950 px-4">

      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_60%)]"></div>

      {/* Card */}
      <div
        className="relative flex w-full max-w-5xl overflow-hidden rounded-3xl
                   bg-black/60 backdrop-blur-2xl border border-gray-800
                   shadow-[0_0_80px_rgba(59,130,246,0.35)]"
      >
        {/* Left Image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-6">
          <img
            src={doctorImage}
            alt="Doctor Illustration"
            className="max-w-[420px] rounded-2xl 
                       shadow-[0_0_40px_rgba(59,130,246,0.35)]"
          />
        </div>

        {/* Right Form */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full md:w-1/2 flex flex-col gap-4 
                     p-8 sm:p-10 text-sm text-gray-300"
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-white">
            <span className="text-blue-500">{state}</span> Login
          </h1>
          <p className="text-center text-gray-400 mb-4">
            Secure access to your dashboard
          </p>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-300">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="mt-1 w-full p-3 rounded-xl
                         bg-black/50 border border-gray-700
                         text-gray-200 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-medium text-gray-300">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full p-3 rounded-xl
                         bg-black/50 border border-gray-700
                         text-gray-200 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 py-3 rounded-xl font-semibold text-white
                       bg-blue-600/20 border border-blue-500
                       shadow-[0_0_25px_rgba(59,130,246,0.6)]
                       hover:bg-blue-600/30 transition"
          >
            Login
          </button>

          {/* Switch */}
          <div className="text-center mt-4 text-gray-400">
            {state === 'Admin' ? (
              <p>
                Doctor Login?{' '}
                <span
                  onClick={() => setState('Doctor')}
                  className="text-blue-400 cursor-pointer font-medium hover:underline"
                >
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Admin Login?{' '}
                <span
                  onClick={() => setState('Admin')}
                  className="text-blue-400 cursor-pointer font-medium hover:underline"
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
