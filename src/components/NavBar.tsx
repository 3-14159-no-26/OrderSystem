import { Link } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import { IconShoppingCart } from "@tabler/icons-react"
// import clsx from "clsx"
import logo from "@/assets/WHEats.png"

const NavBar = () => {
    // const [prevScrollPos, setPrevScrollPos] = useState(0)
    // const [navbarHidden, setNavbarHidden] = useState(false)
    const { menuList } = useMenuListContext()

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollPos = window.pageYOffset

    //         if (prevScrollPos > currentScrollPos) {
    //             setNavbarHidden(false) // 往上滾動，顯示導覽列
    //         } else {
    //             setNavbarHidden(true) // 往下滾動，隱藏導覽列
    //         }

    //         setPrevScrollPos(currentScrollPos)
    //     }

    //     window.addEventListener("scroll", handleScroll)

    //     return () => {
    //         window.removeEventListener("scroll", handleScroll)
    //     }
    // }, [prevScrollPos])

    return (
        <>
            <div className='h-20 max-md:h-12'>
                <div className='nav-bar fixed z-10 flex w-full items-center justify-between bg-white p-4 text-xl shadow-lg transition-all duration-300 max-md:h-12  max-md:justify-center'>
                    <div className='nav-bar__logo'>
                        <Link to='/'>
                            <img className='h-12' src={logo} alt='logo' />
                        </Link>
                    </div>
                    <div className='nav-bar-menu max-md:hidden'>
                        <div className='flex items-center'>
                            <div className='relative pr-4'>
                                <Link to='/cart'>
                                    {menuList.length > 0 && (
                                        <div className='absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 pt-[0.15rem] text-white'>
                                            <div className='text-center text-xs'>
                                                {menuList.length}
                                            </div>
                                        </div>
                                    )}
                                    <IconShoppingCart />
                                </Link>
                            </div>
                            <Link to='/login'>
                                <div className=''>登入</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar
