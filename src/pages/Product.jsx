import { useEffect, useState } from "react"
import API from "../API"
import func from '../commonFunction/func'
import '../css/Product.css'
import { Link } from "react-router-dom"
function Product() {
  const [list, setList] = useState([])

  useEffect(() => {
    API.getProducts()
      .then(res => {
        setList(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="w-full mt-24">
      <div className="w-[80%] mx-auto flex justify-end">
        <input className="border-[1px] border-solid w-[60%] sm:w-[30%] mr-2 border-black px-3 py-1 rounded-lg" type="text" placeholder="Search . . ." />
        <button className="main-btn">Search</button>
      </div>
      <div className="w-[80%] mx-auto flex justify-around items-center flex-wrap my-20">
        {list.map(pro => (
          <div className=" sm:w-[500px] md:w-[300px] mx-3 my-2 overflow-hidden" key={pro._id}>
            <div className="w-full h-[200px] overflow-hidden">
              <Link to={`/product/${pro._id}`}>
                <img src={pro.images[0]} className="w-[90%] mx-auto cursor-pointer hover:scale-105 transition-all" alt="not found" />
              </Link>
            </div>
            <h5 className="trundicate" title={pro.name}><Link to={`/product/${pro._id}`}>{pro.name}</Link></h5><br />
            <div className="w-full flex items-center justify-around">
              <span className="text-red-500">{func.convertVND(pro.price)}</span>
              <del className="text-gray-400">{func.convertVND(pro.price * 1.5)}</del>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Product