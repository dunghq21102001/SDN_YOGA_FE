import { useEffect, useState } from 'react'
import API from '../API'
import defaultImage from '../assets/defaultImage.jpg'
import { BiGroup } from 'react-icons/bi'
import { BsBook } from 'react-icons/bs'
import func from '../commonFunction/func'
import swal2 from '../commonFunction/swal2'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function ClassList() {
    const user = useSelector((state) => state.auth)
    const [list, setList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetchList()
    }, [])
    const fetchList = () => {
        API.getListClassCanRegister()
            .then(res => {
                setList(res.data)
            })
            .catch(err => swal2.error(err, 3000))
    }

    const becomeTrainer = (id) => {
        const data = {
            userId: user?.auth?._id,
            classId: id,
            requestDetails: `This user wants to teach this class`
        }
        API.createRequest(data)
            .then(res => {
                swal2.success('Your request has been submitted successfully, please wait!', 3000)
            })
            .catch(err => {
                if (err.response.data.message) {
                    swal2.error(err.response.data.message, 3000)
                } else {
                    swal2.error(err, 3000)
                }
            })
    }

    const bookNow = (id) => {
        if (!user.auth) {
            swal2.error('You must be logged in to perform this action!', 3500)
            return navigate('/login')
        } else {
            const data = {
                userId: user?.auth?._id,
                classId: id,
                requestDetails: `This user wants to take this class`
            }
            API.createRequest(data)
                .then(res => {
                    swal2.success('Your request has been submitted successfully, please wait!', 3000)
                })
                .catch(err => {
                    if (err.response.data.message) {
                        swal2.error(err.response.data.message, 3000)
                    } else {
                        swal2.error(err, 3000)
                    }
                })
        }
    }
    return (
        <div className="w-[80%] mx-auto flex items-center mt-[100px] flex-wrap justify-center">
            {list.map(item => (
                <div key={item?._id} className="w-[300px] flex rounded-lg overflow-hidden flex-col m-2 hover:scale-95 transition-all hover:shadow-2xl">
                    <img src={defaultImage} alt="" className="w-full h-[200px] mx-auto cursor-pointer" />
                    <div className='ml-4 flex flex-col w-full'>
                        <h5>Class: {item?.name}</h5>
                        <span>{func.convertVND(item?.cost)}</span>
                        <span>Category: {item?.classcategories?.name}</span>
                        <div className='flex items-center w-full justify-around'>
                            <h5 className='flex items-center'><BiGroup className='mx-2' /> {40 - item?.userIds.length} </h5>
                            <h5 className='flex items-center'><BsBook className='mx-2' />{item?.numberSession}</h5>
                        </div>
                    </div>
                    <div className='w-full flex justify-end'>
                        {user?.auth?.role == 'pt'
                            ? <button onClick={() => becomeTrainer(item._id)} className='main-btn transition-btn m-1'>
                                Become Trainer
                            </button>
                            : <button onClick={() => bookNow(item._id)} className='main-btn transition-btn m-1'>
                                Book Now
                            </button>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ClassList