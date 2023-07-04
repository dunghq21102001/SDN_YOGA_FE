import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './css/commonCSS.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import SideBar from './components/sideBar'
import ClassDetail from './pages/ClassDetail'
import About from './pages/About'
import Product from './pages/Product'
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import DetailProduct from './pages/DetailProduct'
import ListClass from './pages/ClassList'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import MyClass from './pages/MyClass'
function App() {
  const user = useSelector((state) => state.auth)
  const ProtectedRoute = ({ children }) => {
    if (user.auth && user.auth.role !== 'admin') return <Navigate to={'/'} />
    else if (user.auth && user.auth.role === 'admin') return <Navigate to={'/admin'} />
    return children
  }
  const CheckAuth = ({ children }) => {
    if (!user.auth) return <Navigate to={'/login'} />
    return children
  }

  const CheckAdminLogged = ({ children }) => {
    if (user.auth && user.auth.role == 'admin') return <Navigate to={'/admin'} />
    return children
  }

  const CheckPermission = ({ children }) => {
    if (!user.auth || user.auth.role != 'admin') return <Navigate to={'/'} />
    return children
  }

  return (
    <>
      {user.auth?.role !== 'admin' ? <SideBar /> : ''}
      <main className='w-full min-h-[100vh]'>
        <ScrollToTop />
        {user.auth?.role !== 'admin' ? <Header /> : ''}
        <Routes>
          <Route path='/' element={<CheckAdminLogged><Home /></CheckAdminLogged>} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={
            <CheckAuth> <Profile /> </CheckAuth>
          } />
          <Route path='/my-class' element={
            <CheckAuth> <MyClass /> </CheckAuth>
          } />
          <Route path='/admin/*' element={
            <CheckPermission> <Admin /> </CheckPermission>
          } />
          <Route path='/products' element={<Product />} />
          <Route path='/product/:id' element={<DetailProduct />} />
          <Route path='/classes' element={<ListClass />} />
          <Route path='/classes/:id' element={<ClassDetail />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={
            <ProtectedRoute> <Login /> </ProtectedRoute>
          } />
          <Route path='/register' element={<Register />} />
        </Routes>
        {user.auth?.role !== 'admin' ? <Footer /> : ''}
      </main>
    </>
  )
}

export default App
