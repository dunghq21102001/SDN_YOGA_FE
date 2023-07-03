import { useDispatch, useSelector } from 'react-redux'
import '../css/Profile.css'
import { useState } from 'react'
import API from '../API'
import swal2 from '../commonFunction/swal2'
import { authen } from '../reducers/userReducer'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebase';
function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth)
  const [fullName, setFullName] = useState(user.auth?.fullName)
  const [email, setEmail] = useState(user.auth?.email)
  const [phone, setPhone] = useState(user.auth?.phone)
  const [address, setAddress] = useState(user.auth?.address)
  const [img, setImg] = useState(user.auth?.image)
  const [id, setId] = useState(user.auth?._id)
  const [progresspercent, setProgresspercent] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const updateProfile = () => {
    if (validateForm()) {
      const data = { fullName, email, phone, address, userName: user.auth.userName, role: user.auth.role }
      API.updateUser(id, data)
        .then(res => {
          swal2.success('Update profile successful')
          fetchCurrentData(id)
        })
        .catch(err => swal2.error(err))
    }
  }

  const fetchCurrentData = (id) => {
    API.getAUser(id)
      .then(res => {
        dispatch(authen(res.data))
      })
      .catch(err => swal2.error(err))
  }

  const validateForm = () => {
    if (fullName.trim() === '') {
      alert('Please enter full name');
      return false;
    }

    if (email.trim() === '') {
      alert('Please enter email');
      return false;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      swal2.error('email is not valid');
      return false;
    }

    if (phone.trim() === '') {
      swal2.error('Please enter phone');
      return false;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      swal2.error('phone is not valid');
      return false;
    }

    if (address.trim() === '') {
      swal2.error('Please enter address');
      return false;
    }
    return true;
  };

  const handleUploadImage = (e) => {
    setIsLoading(true)
    e.preventDefault()
    const file = e.target[0]?.files[0]
    if (!file) return
    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setProgresspercent(progress)
      },
      (error) => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImg(downloadURL)
          const data = {image: downloadURL}
          API.updateImageUser(id, data)
            .then(res => {
              console.log(res);
              swal2.success('Update image successful')
              fetchCurrentData(id)
            })
            .catch(err => swal2.error(err))
        })
      }
    )
    setIsLoading(false)
  }
  return (
    <div className="mt-24 w-full mb-5">
      <div className="w-[80%] mx-auto flex flex-col md:flex-row flex-wrap items-center justify-around">
        <div className='w-[45%] flex flex-col items-center'>
          <div className='w-[300px] h-[300px] rounded-full overflow-hidden'>
            <img className='w-full h-[300px]' src={img} alt="user image" />
          </div>
          <div>
            <form onSubmit={handleUploadImage} className='flex flex-col items-center justify-start'>
              {isLoading ? <p className='text-center my-2'>{progresspercent}%</p> : ''}
              <label htmlFor="image" className='bg-[#d47d3a] rounded-xl px-3 py-2 mt-3 text-white cursor-pointer'>Choose file to upload</label>
              <input type="file" id='image' className='hidden' /><br />
              <button type='submit' className='bg-[#5e3ad4] px-3 py-2 cursor-pointer text-white rounded-xl'>Upload</button>
            </form>
          </div>
        </div>
        <div className='w-[45%]'>
          <div className="profile-box">
            <label htmlFor="name">Full Name</label>
            <input className='profile-input' value={fullName} onChange={(event) => setFullName(event.target.value)} type="text" id="name" />
          </div>
          <div className="profile-box">
            <label htmlFor="email">Email</label>
            <input className='profile-input' value={email} onChange={(event) => setEmail(event.target.value)} type="text" id="email" />
          </div>
          <div className="profile-box">
            <label htmlFor="phone">Phone</label>
            <input className='profile-input' value={phone} onChange={(event) => setPhone(event.target.value)} type="text" id="phone" />
          </div>
          <div className="profile-box">
            <label htmlFor="address">Address</label>
            <input className='profile-input' value={address} onChange={(event) => setAddress(event.target.value)} type="text" id="address" />
          </div>
          <button className='main-btn mb-[10px] float-right mr-8' onClick={updateProfile}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Profile