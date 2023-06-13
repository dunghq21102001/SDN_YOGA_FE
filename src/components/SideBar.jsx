import { Link } from "react-router-dom"

function SideBar() {
    return (
        <div className="h-[60px] w-[400px] hidden sm:flex justify-center items-center fixed top-[50%] translate-y-[50%] left-[-172px] rotate-[-90deg] text-white text-center z-50">
            <span className="bg-[#050715] p-4 w-[40%] cursor-pointer hover:bg-[#251360]">
                <Link to='/products'>
                    Product Store
                </Link>
            </span>
            <span className="bg-[#5e3ad4] p-4 w-[40%] cursor-pointer hover:bg-[#474e83]">Book a Class Now</span>
        </div>
    )
}

export default SideBar