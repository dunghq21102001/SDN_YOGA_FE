import { useState } from "react"
import adminMenu from "../services/menu"
import { Link } from "react-router-dom"
function SideBarAdmin() {
    const [menu, setMenu] = useState(adminMenu.adminMenu())
    return (
        <div className="w-[200px] bg-[#ebebeb] h-screen pb-12 flex items-center flex-col">
            <img src="https://www.compassioninaction.info/wp-content/uploads/2015/10/yoga-logo.png" alt="" />
            <ul className="w-full mt-5">
                {menu.map(i => (
                    <Link to={i.link} key={i.name}>
                        <li className="mb-5 cursor-pointer pl-3 hover:bg-[#6a56b2] hover:text-white py-2" title={i.title}>
                            {i.name}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default SideBarAdmin