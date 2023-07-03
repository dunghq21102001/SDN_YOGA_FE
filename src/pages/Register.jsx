import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import swal2 from '../commonFunction/swal2'
import API from '../API'
function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const nagitive = useNavigate()
  const validateForm = () => {
    if (userName.trim() === '') {
      swal2.error('Please enter username');
      return false;
    }

    if (password.trim() === '') {
      swal2.error('Please enter password');
      return false;
    }

    if (password.length < 6 || password.length > 255) {
      swal2.error('Password must be between 6 and 255 characters in length');
      return false;
    }

    if (passwordAgain.trim() === '') {
      swal2.error('Please enter password again');
      return false;
    }

    if (password !== passwordAgain) {
      swal2.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const register = () => {
    if (validateForm()) {
      const data = { userName, password, image: 'https://i.stack.imgur.com/l60Hf.png', role: 'user', createdDate: new Date().toLocaleString(), fullName: 'none', email: 'none' }
      API.register(data)
        .then(res => {
          if (res.data?.error) {
            return swal2.error(res.data.error)
          } else {
            swal2.success('Register successful, login to continue', 5000)
            nagitive('/login')
          }
        })
        .catch(err => swal2.error(err))
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 mt-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">REGISTER</h1>
              <h5 className="hidden md:block">
                Discover inner harmony and embrace the path to wellness at our Yoga Center
              </h5>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input id="email" value={userName} onChange={(event) => setUserName(event.target.value)} name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username" />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                </div>
                <div className="relative">
                  <input value={password} onChange={(event) => setPassword(event.target.value)} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>
                <div className="relative">
                  <input value={passwordAgain} onChange={(event) => setPasswordAgain(event.target.value)} id="password2" name="password2" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                  <label htmlFor="password2" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password Again</label>
                </div>
                <div className="relative">
                  <button onClick={register} className="main-btn">Register</button>
                </div>
                <div className="text-gray-400">
                  Have account? <span className="text-red-500 cursor-pointer"><Link to='/login'>Login now</Link></span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register