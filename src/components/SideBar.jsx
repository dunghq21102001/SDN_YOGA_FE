import { Link } from "react-router-dom"

function SideBar() {
    return (
        <div className="h-[60px] w-[430px] hidden sm:flex justify-center items-start fixed top-[50%] translate-y-[50%] left-[-172px] rotate-[-90deg] text-white text-center z-50">
            <Link to='/products'>
                <span className="bg-[#050715] p-4 w-[40%] cursor-pointer hover:bg-[#251360]">
                    Product Store
                </span>
            </Link>
            <Link to='/classes'>
                <span className="bg-[#5e3ad4] p-4 w-[40%] cursor-pointer hover:bg-[#474e83]">Book Class Now</span>
            </Link>
        </div>
    )
}

export default SideBar