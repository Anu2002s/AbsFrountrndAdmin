import React, { useContext, useEffect, useCallback } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  const fetchDashboard = useCallback(() => {
    if (aToken) getDashData()
  }, [aToken, getDashData])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  if (!dashData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading dashboard...
      </div>
    )
  }

  const stats = [
    {
      label: 'Doctors',
      value: dashData.doctors,
      icon: assets.doctor_icon,
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]'
    },
    {
      label: 'Appointments',
      value: dashData.appointments,
      icon: assets.appointments_icon,
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]'
    },
    {
      label: 'Patients',
      value: dashData.patients,
      icon: assets.patients_icon,
      glow: 'shadow-[0_0_40px_rgba(249,115,22,0.3)]'
    }
  ]

  const handleCancel = (id) => {
    if (window.confirm('Cancel this appointment?')) {
      cancelAppointment(id)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Dashboard Overview 📊
          </h1>
          <p className="text-gray-400">
            Monitor your medical practice performance
          </p>
        </header>

        {/* Stats */}
        <section className="flex flex-wrap gap-6 mb-12">
          {stats.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 bg-black/70 backdrop-blur-xl
                          border border-gray-700 rounded-2xl p-6 min-w-64
                          transition hover:scale-[1.02] ${item.glow}`}
            >
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500">
                <img
                  src={item.icon}
                  className="w-8 h-8 invert"
                  alt={item.label}
                />
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{item.value}</p>
                <p className="text-gray-400">{item.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Latest Bookings */}
        <section className="bg-black/70 backdrop-blur-xl border border-gray-700
                            rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.25)]
                            overflow-hidden">

          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700">
            <img src={assets.list_icon} className="w-6 h-6 invert" alt="List" />
            <h2 className="text-xl font-bold text-white">
              Latest Bookings
            </h2>
          </div>

          {dashData.latestAppointments?.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              No recent appointments
            </p>
          ) : (
            dashData.latestAppointments.slice(0, 5).map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 px-6 py-4
                           border-b border-gray-800 hover:bg-gray-900/60
                           transition"
              >
                <img
                  src={item.docData.image}
                  className="w-12 h-12 rounded-full object-cover border border-gray-600"
                  alt={item.docData.name}
                />

                <div className="flex-1">
                  <p className="text-white font-semibold">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Booking on {slotDateFormat(item.slotDate)}
                  </p>
                </div>

                {item.cancelled ? (
                  <span className="status-badge text-red-400 bg-red-500/20">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="status-badge text-green-400 bg-green-500/20">
                    Completed
                  </span>
                ) : (
                  <img
                    src={assets.cancel_icon}
                    onClick={() => handleCancel(item._id)}
                    className="w-9 h-9 p-2 cursor-pointer rounded-full
                               bg-red-500/10 hover:bg-red-500/20
                               shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    alt="Cancel appointment"
                    aria-label="Cancel appointment"
                  />
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
