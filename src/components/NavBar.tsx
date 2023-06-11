import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import { IconShoppingCart } from "@tabler/icons-react"
// import clsx from "clsx"
import { v4 as uuidv4 } from "uuid"
import Cookies from "js-cookie"
import gravatar from "gravatar"

const NavBar = () => {
    // const [prevScrollPos, setPrevScrollPos] = useState(0)
    // const [navbarHidden, setNavbarHidden] = useState(false)
    const [login, setLogin] = useState(false)
    const { menuList } = useMenuListContext()
    const go = useNavigate()
    const avatar = gravatar.url("only@sao-x.com")

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            setLogin(true)
        } else {
            setLogin(false)
        }
    }, [])

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

    const setCookie = () => {
        const token = uuidv4()
        Cookies.set("token", token, { expires: 7 })
        setLogin(true)
    }

    const removeCookie = () => {
        Cookies.remove("token")
        setLogin(false)
    }

    const checkGo = (path: string) => {
        const token = Cookies.get("token")
        if (token) {
            go(path)
        } else {
            go("/login")
        }
    }

    const logout = () => {
        Cookies.remove("token")
        setLogin(false)
    }

    return (
        <>
            <div className='h-20 max-md:h-12'>
                <div className='nav-bar fixed z-20 flex w-full items-center justify-between bg-white p-4 text-xl shadow-lg transition-all duration-300 dark:bg-neutral-900  dark:text-white max-md:h-12 max-md:justify-center'>
                    <div className='nav-bar__logo'>
                        <div className='cursor-pointer' onClick={() => go("/")}>
                            <img
                                className='block h-12 w-full dark:hidden'
                                src='/static/img/logo/WHEats.png'
                                alt=''
                            />
                            <img
                                className='hidden h-12 w-full dark:block'
                                src='/static/img/logo/WHEats_dark.png'
                                alt=''
                            />
                        </div>
                    </div>
                    <div className='nav-bar-menu max-md:hidden'>
                        <div className='flex items-center'>
                            <div className='relative pr-4'>
                                <div className='cursor-pointer' onClick={() => checkGo("/cart")}>
                                    {menuList.length > 0 && (
                                        <div className='absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>
                                            {/* pt-[0.15rem] */}
                                            <div className='text-center text-xs'>
                                                {menuList.length}
                                            </div>
                                        </div>
                                    )}
                                    <IconShoppingCart />
                                </div>
                            </div>
                            {login ? (
                                <>
                                    <div
                                        className='h-8 w-8 cursor-pointer overflow-hidden rounded-full'
                                        onClick={() => checkGo("/user")}
                                    >
                                        <img
                                            src={avatar}
                                            alt=''
                                            className='h-full w-full bg-cover object-cover'
                                        />
                                    </div>
                                    <div className='cursor-pointer' onClick={logout}>
                                        <div className=''>登出</div>
                                    </div>
                                </>
                            ) : (
                                <div className='cursor-pointer' onClick={() => checkGo("/login")}>
                                    <div className=''>登入</div>
                                </div>
                            )}
                            <div
                                className='mx-1 cursor-pointer rounded-md bg-slate-400 px-2'
                                onClick={setCookie}
                            >
                                設定cookie
                            </div>
                            <div
                                className='mx-1 cursor-pointer rounded-md bg-slate-400 px-2'
                                onClick={removeCookie}
                            >
                                清除cookie
                            </div>
                        </div>
                    </div>
                </div>
                {/* TODO:測試代碼 */}
                <div className='absolute top-14 z-20 flex w-full justify-center md:hidden'>
                    <div
                        className='mx-1 cursor-pointer rounded-md bg-slate-400 px-2'
                        onClick={setCookie}
                    >
                        設定cookie
                    </div>
                    <div
                        className='mx-1 cursor-pointer rounded-md bg-slate-400 px-2'
                        onClick={removeCookie}
                    >
                        清除cookie
                    </div>
                </div>
                {/* TODO:測試代碼 */}
            </div>
        </>
    )
}

export default NavBar
