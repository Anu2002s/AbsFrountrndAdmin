import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const [activeDropdownId, setActiveDropdownId] = useState(null)
  const navigate = useNavigate()
  const { doctors, changeAvailability, deleteDoctor, aToken, getAllDoctors } =
    useContext(AdminContext)

  useEffect(() => {
    if (aToken) getAllDoctors()
  }, [aToken])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
      {/* Main Container */}
      <div
        className="w-full h-full rounded-2xl
                   bg-black/70 backdrop-blur-xl
                   border border-gray-800
                   shadow-[0_0_60px_rgba(139,92,246,0.25)]
                   p-6 overflow-y-auto"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">
          👨‍⚕️ All Doctors
        </h1>

        {/* Doctors Grid */}
        <div className="flex flex-wrap gap-6">
          {doctors.map((item, index) => (
            <div
              key={index}
              className="relative w-56 rounded-2xl overflow-hidden
                         bg-black/60 backdrop-blur-lg
                         border border-gray-700
                         shadow-[0_0_30px_rgba(59,130,246,0.25)]
                         hover:shadow-[0_0_50px_rgba(139,92,246,0.5)]
                         transition"
            >
              {/* Doctor Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 object-cover"
              />

              {/* Info */}
              <div className="p-4">
                <p className="text-white text-lg font-semibold">
                  {item.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.speciality}
                </p>

                {/* Availability */}
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                    className="accent-purple-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-300">Available</span>
                </div>

                <button
                  onClick={() => {
                    const viewId = item._id || item.id || item.doctorId
                    if (!viewId) {
                      toast.error('Doctor id is required to view')
                      return
                    }
                    navigate(`/doctor/${viewId}`)
                  }}
                  className="mt-3 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
                >
                  View
                </button>
              </div>

              {/* 3-dot dropdown (hidden by default, shows Delete only when opened) */}
              <div className="absolute top-2 right-2">
                <button
                  className="text-white text-lg px-2 py-1 rounded-full hover:bg-white/10"
                  onClick={() =>
                    setActiveDropdownId(
                      activeDropdownId === item._id ? null : item._id
                    )
                  }
                  aria-label="Open doctor actions"
                >
                  •••
                </button>
                {activeDropdownId === item._id && (
                  <div className="mt-1 w-28 rounded-lg bg-gray-900 text-white shadow-lg border border-gray-700">
                    <button
                      onClick={() => {
                        const docId = item._id || item.id || item.doctorId
                        if (!docId) {
                          return toast.error('Doctor id is required to delete')
                        }
                        deleteDoctor(docId)
                        setActiveDropdownId(null)
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Glow Overlay */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none
                              shadow-[inset_0_0_30px_rgba(139,92,246,0.15)]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorsList
