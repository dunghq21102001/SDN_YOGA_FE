import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../API"
import swal2 from '../commonFunction/swal2'
import { useDispatch } from 'react-redux'
import { authen } from "../reducers/userReducer"
function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  function ActionLogin() {
    if (user == '' || password == '') return swal2.error("Please input email and password!")
    const data = {
      userName: user,
      password: password
    }
    API.login(data)
      .then(res => {
        if (res.data.message == 'Đăng nhập thành công') {
          swal2.success('Login successful')
          localStorage.setItem('user', JSON.stringify(res.data.data))
          dispatch(authen(res.data.data))
          if (res.data.data.role != 'admin') return navigate('/')
          else return navigate('/admin')
        } else {
          swal2.error(res.data.message, 3500)
        }
      })
      .catch(err => swal2.error(err, 3000))
  }
  const handleUser = (e) => {
    setUser(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
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
              <h1 className="text-2xl font-semibold">LOGIN</h1>
              <h5 className="hidden md:block">
                Discover inner harmony and embrace the path to wellness at our Yoga Center
              </h5>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input id="email" value={user} onChange={handleUser} name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Username" />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Username</label>
                </div>
                <div className="relative">
                  <input value={password} onChange={handlePassword} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                  <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>
                <div className="relative">
                  <button onClick={ActionLogin} className="main-btn">Login</button>
                </div>
                <div className="text-gray-400">
                  No account? <span className="text-red-500 cursor-pointer"><Link to='/register'>Register now</Link></span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login