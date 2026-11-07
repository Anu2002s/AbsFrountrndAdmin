import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AdminContext } from '../../context/AdminContext'

const ViewDoctor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { aToken, doctors, getAllDoctors, deleteDoctor } = useContext(AdminContext)
  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    if (!aToken) return
    if (!doctors?.length) {
      getAllDoctors()
    }
  }, [aToken, doctors, getAllDoctors])

  useEffect(() => {
    if (!id) return
    const found = doctors?.find(
      (item) => item._id === id || item.id === id || item.doctorId === id
    )
    setDoctor(found || null)
  }, [id, doctors])

  const handleDelete = async () => {
    if (!doctor) {
      toast.error('Doctor not found')
      return
    }
    const docId = doctor._id || doctor.id || doctor.doctorId
    if (!docId) {
      toast.error('Doctor id is required')
      return
    }

    await deleteDoctor(docId)
    toast.success('Doctor deleted successfully')
    navigate('/doctor-list')
  }

  if (!doctor) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
        <div className="text-white">Loading doctor details...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 p-6">
      <div className="max-w-3xl mx-auto bg-black/70 p-6 rounded-2xl border border-gray-800 shadow-lg">
        <button
          onClick={() => navigate('/doctor-list')}
          className="mb-4 text-sm text-indigo-300 hover:text-white"
        >
          ← Back to all doctors
        </button>

        <h1 className="text-3xl font-bold text-white mb-4">Doctor Profile</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={doctor.image || '/placeholder.png'}
            alt={doctor.name}
            className="w-full md:w-48 h-48 rounded-xl object-cover border border-gray-700"
          />

          <div className="text-white">
            <p className="text-2xl font-semibold">{doctor.name}</p>
            <p className="text-gray-300">{doctor.speciality || 'Unknown speciality'}</p>
            <p className="mt-2 text-gray-400">Email: {doctor.email || 'N/A'}</p>
            <p className="mt-1 text-gray-400">Phone: {doctor.phone || 'N/A'}</p>
            <p className="mt-1 text-gray-400">
              Status: {doctor.available ? 'Available' : 'Unavailable'}
            </p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete Doctor
        </button>
      </div>
    </div>
  )
}

export default ViewDoctor
