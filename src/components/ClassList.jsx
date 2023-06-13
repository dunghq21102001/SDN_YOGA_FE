import defaultImage from '../assets/defaultImage.jpg'
import { BiGroup } from 'react-icons/bi'
import { BsDoorClosed } from 'react-icons/bs'
function ClassList() {
    return (
        <div className="w-[80%] mx-auto flex items-center mt-[100px] flex-wrap justify-center">
            <div className="w-[300px] flex rounded-lg overflow-hidden flex-col m-2 hover:scale-95 transition-all hover:shadow-2xl">
                <img src={defaultImage} alt="" className="w-full h-[200px] mx-auto cursor-pointer" />
                <div className='ml-4 flex flex-col w-full'>
                    <h5>Class Name: lớp học lúc 9h</h5>
                    <span>720.000 VND</span>
                    <span>Category: Yin yoga</span>
                    <div className='flex items-center w-full justify-around'>
                        <h5 className='flex items-center'><BiGroup /> 40 </h5>
                        <h5 className='flex items-center'><BsDoorClosed /> P.202  </h5>
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <button className='main-btn transition-btn m-1'>
                        Book Now
                    </button>
                </div>
            </div>
            <div className="w-[300px] flex rounded-lg overflow-hidden flex-col m-2 hover:scale-95 transition-all hover:shadow-2xl">
                <img src={defaultImage} alt="" className="w-full h-[200px] mx-auto cursor-pointer" />
                <div className='ml-4 flex flex-col w-full'>
                    <h5>Class Name: lớp học lúc 9h</h5>
                    <span>720.000 VND</span>
                    <span>Category: Yin yoga</span>
                    <div className='flex items-center w-full justify-around'>
                        <h5 className='flex items-center'><BiGroup /> 40 </h5>
                        <h5 className='flex items-center'><BsDoorClosed /> P.202  </h5>
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <button className='main-btn transition-btn m-1'>
                        Book Now
                    </button>
                </div>
            </div>
            <div className="w-[300px] flex rounded-lg overflow-hidden flex-col m-2 hover:scale-95 transition-all hover:shadow-2xl">
                <img src={defaultImage} alt="" className="w-full h-[200px] mx-auto cursor-pointer" />
                <div className='ml-4 flex flex-col w-full'>
                    <h5>Class Name: lớp học lúc 9h</h5>
                    <span>720.000 VND</span>
                    <span>Category: Yin yoga</span>
                    <div className='flex items-center w-full justify-around'>
                        <h5 className='flex items-center'><BiGroup /> 40 </h5>
                        <h5 className='flex items-center'><BsDoorClosed /> P.202  </h5>
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <button className='main-btn transition-btn m-1'>
                        Book Now
                    </button>
                </div>
            </div>
            <div className="w-[300px] flex rounded-lg overflow-hidden flex-col m-2 hover:scale-95 transition-all hover:shadow-2xl">
                <img src={defaultImage} alt="" className="w-full h-[200px] mx-auto cursor-pointer" />
                <div className='ml-4 flex flex-col w-full'>
                    <h5>Lớp học lúc 9h</h5>
                    <span>720.000 VND</span>
                    <span>Category: Yin yoga</span>
                    <div className='flex items-center w-full justify-around'>
                        <h5 className='flex items-center'><BiGroup /> 40 </h5>
                        <h5 className='flex items-center'><BsDoorClosed /> P.202  </h5>
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <button className='main-btn transition-btn m-1'>
                        Book Now
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ClassList