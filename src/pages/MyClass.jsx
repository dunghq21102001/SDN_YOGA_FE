import { useEffect } from "react"
import { useState } from "react"
import API from '../API'
import defaultImage from '../assets/defaultImage.jpg'
import swal2 from '../commonFunction/swal2'
import { useSelector } from "react-redux"
import { BsBook } from 'react-icons/bs'
import { BiGroup } from 'react-icons/bi'
import func from "../commonFunction/func"
function MyClass() {
  const user = useSelector((state) => state.auth)
  const [listLearn, setListLearn] = useState([])
  const [listTaught, setListTaught] = useState([])
  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = () => {
    API.getListClassOfAUser(user.auth?._id)
      .then(res => {
        setListLearn(res.data.joinedClasses)
        setListTaught(res.data.taughtClasses)
      })
      .catch(err => swal2.error(err, 3000))
  }
  return (
    <div className="w-[80%] mx-auto flex items-center mt-[100px]">
      {listLearn.map(i1 => (
        <div key={i1?._id} className="w-[300px] flex rounded-lg overflow-hidden flex-col m-2 transition-all hover:shadow-2xl">
          <img src={defaultImage} alt="" className="w-full h-[200px] mx-auto cursor-pointer" />
          <div className='ml-4 flex flex-col w-full'>
            <h5>Class: {i1?.name}</h5>
            <span>{func.convertVND(i1?.cost)}</span>
            <span>Category: {i1?.classcategories?.name}</span>
            <div className='flex items-center w-full justify-around'>
              <h5 className='flex items-center'><BiGroup className='mx-2' /> {40 - i1?.userIds.length} </h5>
              <h5 className='flex items-center'><BsBook className='mx-2' />{i1?.numberSession}</h5>
            </div>
          </div>
          <div className='w-full flex flex-col'>
            <div className="w-full flex flex-col items-center">
              <h1>PTs of this class</h1>
              <select className="select-cus w-[90%]" name="" id="">
                {i1.ptIds.map(pt1 => (
                  <option key={pt1?._id}>
                    {pt1.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col items-center">
              <h1>Trainees of this class</h1>
              <select className="select-cus w-[90%]" name="" id="">
                {i1.userIds.map(tn1 => (
                  <option key={tn1?._id}>
                    {tn1.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      {listTaught.map(i2 => (
        <div key={i2?._id} className="w-[300px] flex rounded-lg overflow-hidden flex-col m-2 transition-all hover:shadow-2xl">
          <img src={defaultImage} alt="" className="w-full h-[200px] mx-auto cursor-pointer" />
          <div className='ml-4 flex flex-col w-full'>
            <h5>Class: {i2?.name}</h5>
            <span>{func.convertVND(i2?.cost)}</span>
            <span>Category: {i2?.classcategories?.name}</span>
            <div className='flex items-center w-full justify-around'>
              <h5 className='flex items-center'><BiGroup className='mx-2' /> {40 - i2?.userIds.length} </h5>
              <h5 className='flex items-center'><BsBook className='mx-2' />{i2?.numberSession}</h5>
            </div>
          </div>
          <div className='w-full flex flex-col'>
            <div className="w-full flex flex-col items-center">
              <h1>PTs of this class</h1>
              <select className="select-cus w-[90%]" name="" id="">
                {i2.ptIds.map(pt2 => (
                  <option key={pt2?._id}>
                    {pt2.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col items-center">
              <h1>Trainees of this class</h1>
              <select className="select-cus w-[90%]" name="" id="">
                {i2.userIds.map(tn2 => (
                  <option key={tn2?._id}>
                    {tn2.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyClass