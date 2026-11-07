import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext)

  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getAppointments()
  }, [dToken])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
      {/* Container */}
      <div
        className="w-full h-full rounded-2xl
                   bg-black/70 backdrop-blur-xl
                   border border-gray-800
                   shadow-[0_0_80px_rgba(139,92,246,0.25)]
                   p-6 overflow-hidden"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            All Appointments 📅
          </h1>
          <p className="text-gray-400">
            Manage and track all your patient appointments
          </p>
          <div className="mt-4 inline-block px-4 py-2 rounded-full bg-purple-600/20 text-purple-300 text-sm">
            Total: {appointments?.length || 0} appointments
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden
                     border border-gray-700
                     shadow-[0_0_40px_rgba(59,130,246,0.25)]"
        >
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1.5fr]
                          bg-black/80 text-gray-300 font-semibold px-6 py-4">
            <p className="text-center">#</p>
            <p>Patient</p>
            <p className="text-center">Payment</p>
            <p className="text-center">Age</p>
            <p>Date & Time</p>
            <p className="text-center">Fees</p>
            <p className="text-center">Actions</p>
          </div>

          {/* Rows */}
          <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-800">
            {appointments?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1.5fr]
                           items-center px-6 py-4 text-gray-300
                           hover:bg-white/5 transition"
              >
                {/* Index */}
                <p className="text-center">{index + 1}</p>

                {/* Patient */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                  />
                  <p className="font-medium text-white">
                    {item.userData.name}
                  </p>
                </div>

                {/* Payment */}
                <div className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold
                      ${item.payment
                        ? 'bg-blue-600/20 text-blue-300'
                        : 'bg-orange-600/20 text-orange-300'}`}
                  >
                    {item.payment ? 'Online' : 'Cash'}
                  </span>
                </div>

                {/* Age */}
                <p className="text-center">
                  {calculateAge(item.userData.dob)}
                </p>

                {/* Date */}
                <div>
                  <p className="text-white">
                    {slotDateFormat(item.slotDate)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {item.slotTime}
                  </p>
                </div>

                {/* Fees */}
                <p className="text-center text-green-400 font-bold">
                  {currency}{item.amount}
                </p>

                {/* Actions */}
                <div className="flex justify-center gap-2">
                  {item.cancelled ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-red-600/20 text-red-400">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-600/20 text-green-400">
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

            {/* Empty State */}
            {(!appointments || appointments.length === 0) && (
              <div className="py-20 text-center text-gray-500">
                <p className="text-6xl mb-4">📅</p>
                <p className="text-lg">No appointments scheduled</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
