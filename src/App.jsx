import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './css/commonCSS.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import SideBar from './components/sideBar'
import About from './pages/About'
import Product from './pages/Product'
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import DetailProduct from './pages/DetailProduct'
function App() {
  const user = useSelector((state) => state.auth)
  const ProtectedRoute = ({ children }) => {
    if (user.auth) {
      return <Navigate to={'/'} />
    }
    return children
  }
  const CheckAuth = ({ children }) => {
    if (!user.auth) {
      return <Navigate to={'/login'} />
    }
    return children
  }

  return (
    <>
      <SideBar />
      <main className='w-full min-h-[100vh]'>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={
            <CheckAuth> <Profile /> </CheckAuth>
          } />
          <Route path='/products' element={<Product />} />
          <Route path='/product/:id' element={<DetailProduct />} />
          <Route path='/login' element={
            <ProtectedRoute> <Login /> </ProtectedRoute>
          } />
          <Route path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App
