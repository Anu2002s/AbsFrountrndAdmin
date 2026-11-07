import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext)

  const { currency, backendUrl } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) getProfileData()
  }, [dToken])

  return (
    profileData && (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

          {/* Image Section */}
          <div
            className="lg:w-1/3 bg-black/60 border border-gray-800
                       rounded-3xl p-4 backdrop-blur-xl
                       shadow-[0_0_60px_rgba(59,130,246,0.25)]"
          >
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Content Section */}
          <div
            className="flex-1 bg-black/60 border border-gray-800
                       rounded-3xl p-8 backdrop-blur-xl
                       shadow-[0_0_60px_rgba(168,85,247,0.25)]"
          >
            {/* Name */}
            <h1 className="text-4xl font-bold text-white mb-2">
              {profileData.name} 👨‍⚕️
            </h1>

            {/* Degree */}
            <div className="flex flex-wrap items-center gap-3 text-gray-400">
              <p className="text-lg">
                {profileData.degree} – {profileData.speciality}
              </p>
              <span className="px-4 py-1 text-sm rounded-full bg-white/10 border border-gray-700">
                {profileData.experience}
              </span>
            </div>

            {/* About */}
            <div className="mt-8">
              <p className="text-lg font-semibold text-white mb-2">About</p>
              {isEdit ? (
                <textarea
                  rows={6}
                  className="w-full p-4 rounded-xl bg-black/50 border border-gray-700
                             text-gray-200 resize-none focus:outline-none"
                  value={profileData.about}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value
                    }))
                  }
                />
              ) : (
                <div className="bg-black/40 border border-gray-800 p-4 rounded-xl text-gray-300">
                  {profileData.about}
                </div>
              )}
            </div>

            {/* Fees */}
            <div className="mt-6">
              <p className="text-lg font-semibold text-white">
                Appointment Fee:
                <span className="ml-2 text-green-400">
                  {currency}{' '}
                  {isEdit ? (
                    <input
                      type="number"
                      className="ml-2 w-24 p-2 rounded bg-black/50 border border-gray-700
                                 text-gray-200 focus:outline-none"
                      value={profileData.fees}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value
                        }))
                      }
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            {/* Address */}
            <div className="mt-6">
              <p className="text-lg font-semibold text-white">Address</p>

              {isEdit ? (
                <div className="space-y-3 mt-3">
                  <input
                    type="text"
                    className="w-full p-3 rounded bg-black/50 border border-gray-700
                               text-gray-200 focus:outline-none"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))
                    }
                  />
                  <input
                    type="text"
                    className="w-full p-3 rounded bg-black/50 border border-gray-700
                               text-gray-200 focus:outline-none"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))
                    }
                  />
                </div>
              ) : (
                <div className="mt-3 bg-black/40 border border-gray-800 p-4 rounded-xl text-gray-300">
                  <p>{profileData.address.line1}</p>
                  <p>{profileData.address.line2}</p>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-3">
              <input
                type="checkbox"
                checked={profileData.available}
                disabled={!isEdit}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available
                  }))
                }
                className="w-5 h-5 accent-green-500"
              />
              <label
                className={`font-semibold ${
                  profileData.available
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}
              >
                Available for appointments
              </label>
            </div>

            {/* Actions */}
            <div className="mt-10 flex gap-4">
              {isEdit ? (
                <>
                  <button
                    onClick={updateProfile}
                    className="px-8 py-3 rounded-full bg-green-600/20 text-green-400
                               border border-green-500
                               shadow-[0_0_20px_rgba(34,197,94,0.6)]
                               hover:bg-green-600/30"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEdit(false)}
                    className="px-8 py-3 rounded-full bg-red-600/20 text-red-400
                               border border-red-500
                               shadow-[0_0_20px_rgba(239,68,68,0.6)]
                               hover:bg-red-600/30"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-8 py-3 rounded-full bg-blue-600/20 text-blue-400
                             border border-blue-500
                             shadow-[0_0_25px_rgba(59,130,246,0.6)]
                             hover:bg-blue-600/30"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorProfile
