import { Link } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import { IconShoppingCart } from "@tabler/icons-react"
import logo from "@/assets/WHEats.png"

const NavBar = () => {
    const { menuList } = useMenuListContext()

    return (
        <>
            <div className='nav-bar flex w-full items-center justify-between p-4 text-xl shadow-lg'>
                <div className='nav-bar__logo'>
                    <Link to='/'>
                        <img className='h-12' src={logo} alt='logo' />
                    </Link>
                </div>
                <div className='nav-bar-menu'>
                    <div className='flex items-center'>
                        <div className='relative pr-4'>
                            <Link to='/cart'>
                                {menuList.length > 0 && (
                                    <div className='absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 pt-[0.15rem] text-white'>
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
