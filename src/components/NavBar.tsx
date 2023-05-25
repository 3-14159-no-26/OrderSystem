import { Link } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import { IconShoppingCart } from "@tabler/icons-react"
import logo from "@/assets/WHEats.png"

const NavBar = () => {
    const { menuList } = useMenuListContext()

    return (
        <>
            <div className='nav-bar flex items-center justify-between shadow-lg w-full p-4 text-xl'>
                <div className='nav-bar__logo'>
                    <Link to='/'>
                        <img className='h-12' src={logo} alt='logo' />
                    </Link>
                </div>
                <div className='nav-bar-menu'>
                    <div className='flex items-center'>
                        <div className='pr-4 relative'>
                            <Link to='/cart'>
                                {menuList.length > 0 && (
                                    <div className='flex items-center justify-center absolute -top-1 right-2 w-4 h-4 pt-[0.15rem] bg-red-500 text-white rounded-full'>
                                        <div className='text-center text-xs'>{menuList.length}</div>
                                    </div>
                                )}
                                <IconShoppingCart />
                            </Link>
                        </div>
                        <div className=''>登入</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar
