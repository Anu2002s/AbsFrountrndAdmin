import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext)

  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getDashData()
  }, [dToken])

  if (!dashData) return null

  const statsCards = [
    {
      icon: assets.earning_icon,
      value: `${currency} ${dashData.earnings || 0}`,
      label: 'Earnings',
      glow: 'shadow-[0_0_40px_rgba(34,197,94,0.4)]',
      text: 'text-green-400'
    },
    {
      icon: assets.appointments_icon,
      value: dashData.appointments || 0,
      label: 'Appointments',
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]',
      text: 'text-blue-400'
    },
    {
      icon: assets.patients_icon,
      value: dashData.patients || 0,
      label: 'Patients',
      glow: 'shadow-[0_0_40px_rgba(168,85,247,0.4)]',
      text: 'text-purple-400'
    }
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-400">
            Track your practice performance and manage appointments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className={`bg-black/70 border border-gray-800 rounded-2xl p-6
                          backdrop-blur-xl ${stat.glow}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-white/10">
                  <img
                    src={stat.icon}
                    alt=""
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${stat.text}`}>
                    {stat.value}
                  </p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Appointments */}
        <div
          className="bg-black/70 border border-gray-800 rounded-2xl
                     backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,0.25)]
                     overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
            <h2 className="text-xl font-semibold text-white">
              Latest Bookings
            </h2>
            <span className="text-sm text-purple-400 bg-purple-600/20 px-3 py-1 rounded-full">
              {dashData.latestAppointments?.length || 0} appointments
            </span>
          </div>

          {/* List */}
          <div className="divide-y divide-gray-800">
            {dashData.latestAppointments?.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition"
              >
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border border-gray-700"
                />

                <div className="flex-1">
                  <p className="text-white font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {item.cancelled ? (
                    <span className="px-3 py-1 text-sm bg-red-600/20 text-red-400 rounded-full">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 text-sm bg-green-600/20 text-green-400 rounded-full">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 rounded-full bg-red-600/20
                                   hover:bg-red-600/40
                                   shadow-[0_0_15px_rgba(239,68,68,0.6)]"
                      >
                        <img src={assets.cancel_icon} className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="p-2 rounded-full bg-green-600/20
                                   hover:bg-green-600/40
                                   shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                      >
                        <img src={assets.tick_icon} className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Empty */}
            {(!dashData.latestAppointments ||
              dashData.latestAppointments.length === 0) && (
              <div className="py-12 text-center text-gray-500">
                <p className="text-5xl mb-3">📋</p>
                <p>No appointments yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
