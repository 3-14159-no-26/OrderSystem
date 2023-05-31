import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
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
                <div className='flex flex-col items-center justify-center'>
                    <IconToolsKitchen2 />
                    <div className='mt-1'>訂餐</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <IconShoppingCart />
                    <div className='mt-1'>購物車</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <IconClipboardCheck />
                    <div className='mt-1'>訂單</div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <IconUser />
                    <div className='mt-1'>會員</div>
                </div>
            </div>
        </div>
    )
}

export default Footer
