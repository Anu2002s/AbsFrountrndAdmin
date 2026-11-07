import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } =
    useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } =
    useContext(AppContext)

  useEffect(() => {
    if (aToken) getAllAppointments()
  }, [aToken])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            All Appointments 📅
          </h1>
          <p className="text-gray-400">
            Manage and monitor all scheduled appointments
          </p>
        </div>

        {/* Table Card */}
        <div className="relative bg-black/70 backdrop-blur-xl rounded-2xl 
                        border border-gray-700 shadow-[0_0_40px_5px_rgba(139,92,246,0.2)] 
                        overflow-hidden">

          {/* Glow Border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none
                          shadow-[0_0_60px_10px_rgba(59,130,246,0.15)]" />

          <div className="relative z-10 max-h-[80vh] overflow-y-auto">

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]
                            px-6 py-4 border-b border-gray-700 sticky top-0 bg-black">
              <p className="text-gray-300 font-semibold">#</p>
              <p className="text-gray-300 font-semibold">Patient</p>
              <p className="text-gray-300 font-semibold">Age</p>
              <p className="text-gray-300 font-semibold">Date & Time</p>
              <p className="text-gray-300 font-semibold">Doctor</p>
              <p className="text-gray-300 font-semibold">Fees</p>
              <p className="text-gray-300 font-semibold text-center">Action</p>
            </div>

            {/* Rows */}
            {appointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]
                           items-center gap-2 px-6 py-4 border-b border-gray-800
                           hover:bg-gray-900/60 transition-colors"
              >
                <p className="hidden sm:block text-purple-400 font-semibold">
                  {index + 1}
                </p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    alt=""
                  />
                  <p className="text-gray-200 font-medium">
                    {item.userData.name}
                  </p>
                </div>

                <p className="hidden sm:block text-gray-300">
                  {calculateAge(item.userData.dob)}
                </p>

                <p className="text-gray-300">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                {/* Doctor */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.docData.image}
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    alt=""
                  />
                  <p className="text-gray-200 font-medium">
                    {item.docData.name}
                  </p>
                </div>

                <p className="text-green-400 font-bold">
                  {currency}{item.amount}
                </p>

                {/* Action */}
                <div className="flex justify-center">
                  {item.cancelled ? (
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                      Completed
                    </span>
                  ) : (
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      src={assets.cancel_icon}
                      className="w-8 h-8 cursor-pointer p-1 rounded-full 
                                 bg-red-500/10 hover:bg-red-500/20
                                 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                      alt=""
                    />
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}

export default AllAppointments
