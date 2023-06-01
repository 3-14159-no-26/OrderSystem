import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import {
    IconToolsKitchen2,
    IconShoppingCart,
    IconClipboardCheck,
    IconUser,
} from "@tabler/icons-react"
import clsx from "clsx"

const Footer = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [navbarHidden, setNavbarHidden] = useState(false)
    const { menuList } = useMenuListContext()
    const go = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset

            if (prevScrollPos > currentScrollPos) {
                setNavbarHidden(false) // 往上滾動，顯示導覽列
            } else {
                setNavbarHidden(true) // 往下滾動，隱藏導覽列
            }

            setPrevScrollPos(currentScrollPos)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [prevScrollPos])

    return (
        <div className='hidden h-20 max-md:block'>
            <div
                className={clsx(
                    "fixed bottom-0 z-10 flex w-full items-center justify-around bg-slate-300 py-2",
                    { hidden: navbarHidden }
                )}
            >
                <div className='flex flex-col items-center justify-center' onClick={() => go("/")}>
                    <IconToolsKitchen2 />
                    <div className='mt-1'>訂餐</div>
                </div>
                <div
                    className='relative flex flex-col items-center justify-center'
                    onClick={() => go("/cart")}
                >
                    {menuList.length > 0 && (
                        <div className='absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 pt-[0.15rem] text-white'>
                            <div className='text-center text-xs'>{menuList.length}</div>
                        </div>
                    )}
                    <IconShoppingCart />
                    <div className='mt-1'>購物車</div>
                </div>
                <div
                    className='flex flex-col items-center justify-center'
                    onClick={() => go("/details")}
                >
                    <IconClipboardCheck />
                    <div className='mt-1'>訂單</div>
                </div>
                <div
                    className='flex flex-col items-center justify-center'
                    onClick={() => go("/user")}
                >
                    <IconUser />
                    <div className='mt-1'>會員</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
