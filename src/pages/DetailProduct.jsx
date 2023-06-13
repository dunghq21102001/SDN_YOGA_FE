import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import swal2 from '../commonFunction/swal2'
import notFoundProdct from '../assets/404Product.jpg'
import API from "../API"
import func from "../commonFunction/func"
import { useSelector } from "react-redux"

function DetailProduct() {
  const { id } = useParams()
  const user = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [currentP, setCurrentP] = useState(null)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    API.getAProduct(id)
      .then(res => {
        if (res.data.message) {
          setIsNotFound(true)
          return swal2.error(res.data.message)
        }
        else setCurrentP(res.data.data)
      })
      .catch(err => swal2.error(err))
  }, [id])

  function checkAuth() {
    if(!user.auth) return navigate('/login')
  }
  function AddToCart() {
    checkAuth()
  }
  function BuyNow() {
    checkAuth()
  }
  return (
    <div className="w-full mt-24">
      {isNotFound ? <div className="w-[80%] mx-auto text-center">
        <h1 className="text-[30px] text-gray-400">Product not found!!!</h1>
        <img src={notFoundProdct} alt="not found" className="w-full" />
      </div> : ''}
      <div className="w-[80%] mx-auto flex justify-between">
        <div className="w-[40%]">
          <img src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-720w,f_auto,q_auto:best/newscms/2023_18/1658168/purples-lavenders-balancefrom-gym-mats-bfgy-ap6pp-64-600-5ff5ceef561d6.jpg" className="w-full" alt="" />
        </div>
        <div className="w-[55%] relative">
          <h1 className="my-3 text-[20px]">{currentP?.name}</h1>
          <h1 className="my-3 text-red-500">{func.convertVND(currentP?.price)}</h1>
          <del className="my-3 text-gray-400">{func.convertVND(currentP?.price * 1.5)}</del>
          <p>{currentP?.description}</p>
          <div className="absolute bottom-14 left-[50%] translate-x-[-50%] flex items-center justify-around w-[80%] lg:w-[60%] mx-auto my-3">
            <button className="second-btn" onClick={AddToCart}>Add To cart</button>
            <button className="main-btn" onClick={BuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct