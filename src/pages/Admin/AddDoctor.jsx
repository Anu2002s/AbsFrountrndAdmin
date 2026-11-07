import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [loading, setLoading] = useState(false)

    const { backendUrl } = useContext(AppContext)
    const { aToken } = useContext(AdminContext)

    const specialityOptions = [
        { value: "General physician", emoji: "🩺" },
        { value: "Gynecologist", emoji: "👩‍⚕️" },
        { value: "Dermatologist", emoji: "✨" },
        { value: "Pediatricians", emoji: "👶" },
        { value: "Neurologist", emoji: "🧠" },
        { value: "Gastroenterologist", emoji: "🫁" }
    ]

    const experienceOptions = [
        "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", 
        "6 Years", "7 Years", "8 Years", "9 Years", "10 Years"
    ]

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            if (!docImg) {
                toast.error('Image Not Selected')
                setLoading(false)
                return
            }

            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                { headers: { aToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setDocImg(null)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen bg-gradient-to-br from-gray-900 via-blue to-gray-900 flex items-center justify-center mt-15">
            <form 
                onSubmit={onSubmitHandler} 
                className="w-full max-w-6xl mx-auto relative z-10 px-4  lg:px-0"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2 pt-6">
                        Add New Doctor 👨‍⚕️
                    </h1>
                    <p className="text-gray-300">
                        Create a comprehensive doctor profile for your medical practice
                    </p>
                </div>

                {/* Main Card */}
                <div className="relative bg-black/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700 p-8 overflow-hidden">
                    {/* Image Upload */}
                    <div className="flex items-center gap-6 mb-10 p-6 bg-black/50 rounded-2xl border border-gray-700">
                        <label htmlFor="doc-img" className="cursor-pointer">
                            <div className="relative">
                                <img
                                    className="w-24 h-24 rounded-full border-4 border-gray-600 object-cover"
                                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                    alt="Doctor"
                                />
                                {!docImg && (
                                    <div className="absolute inset-0 bg-white/10 rounded-full flex items-center justify-center">
                                        <span className="text-3xl">📸</span>
                                    </div>
                                )}
                            </div>
                        </label>
                        <input
                            onChange={(e) => setDocImg(e.target.files[0])}
                            type="file"
                            id="doc-img"
                            hidden
                            accept="image/*"
                        />
                        <div>
                            <p className="text-gray-200 font-semibold text-lg">Upload Doctor Picture</p>
                            <p className="text-gray-400 text-sm">Choose a professional photo (JPG, PNG)</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="flex flex-col lg:flex-row gap-8 text-gray-200 mb-8">
                        {/* Left Column */}
                        <div className="w-full lg:flex-1 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">👤 Doctor Name</label>
                                <input
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none"
                                    type="text"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">📧 Email Address</label>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none"
                                    type="email"
                                    placeholder="doctor@example.com"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">🔒 Password</label>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none"
                                    type="password"
                                    placeholder="Create secure password"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">🎓 Experience</label>
                                <select
                                    onChange={e => setExperience(e.target.value)}
                                    value={experience}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none cursor-pointer"
                                >
                                    {experienceOptions.map((exp, i) => (
                                        <option key={i} value={exp}>{exp}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">💰 Consultation Fees</label>
                                <input
                                    onChange={e => setFees(e.target.value)}
                                    value={fees}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none"
                                    type="number"
                                    placeholder="Enter consultation fee"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="w-full lg:flex-1 flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">🏥 Speciality</label>
                                <select
                                    onChange={e => setSpeciality(e.target.value)}
                                    value={speciality}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none cursor-pointer"
                                >
                                    {specialityOptions.map((spec, i) => (
                                        <option key={i} value={spec.value}>
                                            {spec.emoji} {spec.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">🎓 Medical Degree</label>
                                <input
                                    onChange={e => setDegree(e.target.value)}
                                    value={degree}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none"
                                    type="text"
                                    placeholder="e.g., MBBS, MD, MS"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold">📍 Clinic Address</label>
                                <input
                                    onChange={e => setAddress1(e.target.value)}
                                    value={address1}
                                    className="border border-gray-600 rounded-lg px-4 py-3 mb-3 bg-black/50 focus:outline-none"
                                    type="text"
                                    placeholder="Street address, building number"
                                    required
                                />
                                <input
                                    onChange={e => setAddress2(e.target.value)}
                                    value={address2}
                                    className="border border-gray-600 rounded-lg px-4 py-3 bg-black/50 focus:outline-none"
                                    type="text"
                                    placeholder="City, state, postal code"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div className="mb-8">
                        <label className="font-semibold text-lg mb-3 flex items-center gap-2">📝 About Doctor</label>
                    <textarea
  onChange={e => setAbout(e.target.value)}
  value={about}
  className="w-full px-4 py-3 border border-gray-600 rounded-lg 
             bg-black/50 text-gray-200 placeholder:text-gray-400
             focus:outline-none resize-none"
  rows={5}
/>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-12 py-4 text-white font-bold rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Add Doctor 👨‍⚕️'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor
