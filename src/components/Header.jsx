import { Link, useNavigate } from "react-router-dom"
import menu from "../services/menu"
import { FaRegUserCircle } from 'react-icons/fa'
import { BiMenu } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import test from '../assets/defaultImage.jpg'
import { authen } from "../reducers/userReducer"
import swal2 from "../commonFunction/swal2"
function Header() {
  const user = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mainMenu = menu.mainMenu()
  const [isShow, setIsShow] = useState(false)
  const [isShowProfileMenu, setIsShowProfileMenu] = useState(false)

  function showMenu() {
    setIsShow(!isShow)
  }

  function handleShowAvatar() {
    setIsShowProfileMenu(!isShowProfileMenu)
  }

  function Logout() {
    dispatch(authen(null))
    swal2.success('Logout successful')
    setIsShowProfileMenu(false)
    sessionStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="w-full bg-[#050716] py-3 px-2 fixed top-0 left-0 right-0 flex justify-between items-center z-50">
      <ul className="text-white items-center w-[60%] hidden md:flex">
        {mainMenu.map(item => (
          <Link className="mx-4" key={item.name} to={item.link}>
            <li className="cursor-pointer hover:bg-white p-4 hover:text-[#050716] rounded-md transition-btn" title={item.title}>
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      {/* mobile menu */}
      {isShow
        ? <MdClose className="md:hidden block text-white" onClick={showMenu} />
        : <BiMenu className="md:hidden block text-white" onClick={showMenu} />}
      {isShow
        ? <ul className="items-center w-full flex flex-col md:hidden fixed top-[50px] left-0 bg-[#0b1030] text-white">
          {mainMenu.map(item => (
            <Link className="mx-4" key={item.name} to={item.link}>
              <li className="cursor-pointer hover:bg-white p-4 hover:text-[#050716] rounded-md transition-btn" title={item.title}>
                {item.name}
              </li>
            </Link>
          ))}
          <li className="cursor-pointer hover:bg-white p-4 hover:text-[#050716] rounded-md transition-btn">
            MemberShip
          </li>
        </ul>
        : ''}
      {user.auth
        ? <div className="relative">
          <img id="avatarButton" onClick={handleShowAvatar} type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" className="w-10 h-10 rounded-full cursor-pointer" src={test} alt="User dropdown" />
          <div id="userDropdown" className={isShowProfileMenu ? "z-10 bg-white divide-y divide-gray-100 absolute bottom-[-200px] right-0 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600" : "z-10 bg-white divide-y hidden divide-gray-100 absolute bottom-[-200px] right-0 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"}>
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{user.auth.fullName}</div>
              <div className="font-medium truncate">{user.auth.email}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
              <Link to={'/profile'}>
                <li>
                  <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white">
                    Profile
                  </p>
                </li>
              </Link>
              <li>
                <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:hover:text-white">
                  My classes
                </p>
              </li>
            </ul>
            <div className="py-1">
              <p onClick={Logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200 dark:hover:text-white">Sign out</p>
            </div>
          </div>
        </div>
        : <div className="flex items-center">
          <button className="bg-[#5e3ad4] text-white hover:text-[#050716] hover:bg-white transition-btn px-4 py-2 md:block hidden">
            MemberShip
          </button>
          <Link to='login'>
            <button className="text-white flex items-center ml-4 hover:text-gray-400 mx-4">
              <FaRegUserCircle className="mr-2" /> Login
            </button>
          </Link>
        </div>}
    </div>
  )
}

export default Header