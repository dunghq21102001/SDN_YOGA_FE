import '../css/CategoryList.css'
import API from '../API'
import swal2 from '../commonFunction/swal2'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function CategoryList() {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchList()
  }, [])
  const fetchList = () => {
    API.getClassCategoriesList()
      .then(res => {
        setList(res.data)
      })
      .catch(err => swal2.error(err, 3000))
  }

  return (
    <div className="w-full hidden sm:flex flex-col justify-center items-center">
      {list.map(item => (
        <div key={item?._id} className="parent">
          <span className='text-[50px] text-[#5e3ad4] font-bold'>{item?.name}</span>
          <div className="child">
            <p>{item?.description}</p>
            <Link to={`/classes/${item?.name}`}>
              <button className='main-btn'>
                See Class List
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryList