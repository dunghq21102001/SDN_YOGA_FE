import { useSelector } from 'react-redux'
import '../css/Profile.css'
import { useState } from 'react'
function Profile() {
  const user = useSelector(state => state.auth)
  const [fullName, setFullName] = useState(user.auth?.fullName)
  const [email, setEmail] = useState(user.auth?.email)
  const [phone, setPhone] = useState(user.auth?.phone)
  return (
    <div className="mt-24 w-full">
      <div className="w-[80%] mx-auto flex flex-wrap items-end justify-around">
        <div className="profile-box">
          <label htmlFor="name">Full Name</label>
          <input className='profile-input' value={fullName} type="text" id="name" />
        </div>
        <div className="profile-box">
          <label htmlFor="email">Email</label>
          <input className='profile-input' value={email} type="text" id="email" />
        </div>
        <div className="profile-box">
          <label htmlFor="phone">Phone</label>
          <input className='profile-input' value={phone} type="text" id="phone" />
        </div>
        <button className='main-btn mb-[10px]'>Save</button>
      </div>
    </div>
  )
}

export default Profile