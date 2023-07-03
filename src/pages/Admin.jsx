import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import SideBarAdmin from "../components/SideBarAdmin"
import User from './Admin/User'
import AdminProduct from './Admin/AdminProduct'
import AdminClass from './Admin/AdminClass'
import AdminContact from './Admin/AdminContact'
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { BsArrowsFullscreen } from 'react-icons/bs'
import test from '../assets/defaultImage.jpg'
import swal2 from "../commonFunction/swal2"
import { authen } from "../reducers/userReducer"
function Admin() {
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false)
  function handleShowAvatar() {
    setIsShowProfileMenu(!isShowProfileMenu)
  }
  function Logout() {
    dispatch(authen(null))
    swal2.success('Logout successful')
    setIsShowProfileMenu(false)
    localStorage.removeItem('user')
    navigate('/login')
  }
  const CheckAuth = ({ children }) => {
    if (!user.auth) return <Navigate to={'/login'} />
    return children
  }

  const fullScreen = () => {
    const ele = document.body
    ele.requestFullscreen()
  }
  return (
    <div className="w-full flex">
      <SideBarAdmin />
      <div className="admin-wf">
        <div className="w-full bg-[#5e3ad4] flex justify-between px-4 py-2">
          <button onClick={fullScreen}><BsArrowsFullscreen /></button>
          <div className="relative">
            <img id="avatarButton" onClick={handleShowAvatar} type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src={user.auth.image} alt="User dropdown" />
            <div id="userDropdown" className={isShowProfileMenu ? "z-10 bg-white divide-y divide-gray-100 absolute bottom-[-117px] right-0 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600" : "z-10 bg-white divide-y hidden divide-gray-100 absolute bottom-[-117px] right-0 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"}>
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{user.auth.fullName}</div>
                <div className="font-medium truncate">{user.auth.email}</div>
              </div>
              <div className="py-1">
                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200 dark:hover:text-white" onClick={Logout}>Sign out</p>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route index element={<User />} />
          <Route path="/users-mnt" element={<CheckAuth><User /></CheckAuth>} />
          <Route path="/products-mnt" element={<CheckAuth><AdminProduct /></CheckAuth>} />
          <Route path="/classes-mnt" element={<CheckAuth><AdminClass /></CheckAuth>} />
          <Route path="/contact-mnt" element={<CheckAuth><AdminContact /></CheckAuth>} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin