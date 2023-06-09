import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import {
    IconToolsKitchen2,
    IconShoppingCart,
    IconClipboardCheck,
    IconUser,
} from "@tabler/icons-react"
import Cookies from "js-cookie"
import clsx from "clsx"

const Footer = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [navbarHidden, setNavbarHidden] = useState(false)
    const { menuList } = useMenuListContext()
    const go = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY

            if (prevScrollPos > currentScrollPos) {
                setNavbarHidden(false) // 往上滾動，顯示導覽列
            } else {
                setNavbarHidden(true) // 往下滾動，隱藏導覽列
            }

            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [prevScrollPos])

    const checkGo = (path: string) => {
        const token = Cookies.get("token")
        if (token) {
            go(path)
        } else {
            go("/login")
        }
    }

    return (
        <div className='hidden h-20 max-md:block'>
            <div
                className={clsx(
                    "fixed bottom-0 z-10 flex w-full items-center justify-around bg-slate-300 py-2 transition-all duration-300 dark:bg-neutral-800 dark:text-white/90",
                    { hidden: navbarHidden }
                )}
            >
                <div className='flex flex-col items-center justify-center' onClick={() => go("/")}>
                    <IconToolsKitchen2 />
                    <div className='mt-1'>訂餐</div>
                </div>
                <div
                    className='relative flex flex-col items-center justify-center'
                    onClick={() => checkGo("/cart")}
                >
                    {menuList.length > 0 && (
                        <div className='absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white'>
                            {/* pt-[0.15rem] */}
                            <div className='text-center text-xs'>{menuList.length}</div>
                        </div>
                    )}
                    <IconShoppingCart />
                    <div className='mt-1'>購物車</div>
                </div>
                <div
                    className='flex flex-col items-center justify-center'
                    onClick={() => checkGo("/details")}
                >
                    <IconClipboardCheck />
                    <div className='mt-1'>訂單</div>
                </div>
                <div
                    className='flex flex-col items-center justify-center'
                    onClick={() => checkGo("/user")}
                >
                    <IconUser />
                    <div className='mt-1'>會員</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
