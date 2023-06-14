import { useEffect, useState } from "react"
import { useMenuListContext } from "@/context/MenuList"
import * as Dialog from "@radix-ui/react-dialog"
import { IconPlus, IconMinus, IconX } from "@tabler/icons-react"
import { MenuType } from "@/types"
import { useLocation, useNavigate } from "react-router-dom"

const Order = ({
    menu,
    isOpen,
    setIsOpen,
    notify,
}: {
    menu: MenuType
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    notify: any
}) => {
    const go = useNavigate()
    const location = useLocation()
    const [count, setCount] = useState(1)
    const { menuList, addToCart } = useMenuListContext()

    // 讀取目前採購量
    useEffect(() => {
        console.log("open商品ID", menu.id, "讀取目前採購量", menuList)
        if (menu.id) {
            const index = menuList.findIndex((e) => e.id == menu.id)
            if (index !== -1) {
                setCount(menuList[index].count)
                setIsOpen(false)
            } else {
                setCount(1)
            }
        }
    }, [isOpen])

    const addToCartAndNavigate = (data: MenuType, count: number) => {
        addToCart(data, count)
        notify()
        // 通知完成自動跳轉
        // 如果是從購物車頁面來的，就回到購物車頁面
        console.log("上一頁", location.state?.prevPath)

        if (location.state?.prevPath === "/cart") {
            setTimeout(() => {
                go("/cart")
            }, 1000)
        }
        // 如果是從首頁來的，就回到首頁
    }

    return (
        <>
            <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-[rgba(0,0,0,.5)] backdrop-blur-sm data-[state=open]:animate-overlayShow' />
                <Dialog.Content asChild>
                    <div className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4 shadow-lg focus:outline-none data-[state=open]:animate-contentShow dark:bg-neutral-900 dark:dark:text-white/60'>
                        <Dialog.Title asChild>
                            <div className='flex items-center justify-between'>
                                <div className=''>編輯個人資料</div>
                                <Dialog.Close>
                                    <IconX size={24} />
                                </Dialog.Close>
                            </div>
                        </Dialog.Title>
                        <Dialog.Description asChild>
                            <div className='flex w-full flex-col items-center justify-center pt-20'>
                                {/* {loading && <Loding />} */}
                                {menu && (
                                    <div className='relative flex h-64 w-64 flex-col justify-end rounded-md p-2 dark:dark:text-white/60'>
                                        <div className='absolute -top-10'>
                                            <img
                                                className='h-full w-full bg-cover object-cover'
                                                src={`/static/img/meals/${menu.cover}.webp`}
                                                alt=''
                                            />
                                        </div>
                                        <div className=''>
                                            <div className=''>{menu.name}</div>
                                            <div className=''>${menu.price}</div>
                                            <div className='flex items-center py-2'>
                                                <button
                                                    className='rounded-lg bg-amber-400 p-1 transition-all duration-300 hover:bg-amber-500 dark:text-neutral-900'
                                                    onClick={() => {
                                                        if (count > 1) setCount(count - 1)
                                                    }}
                                                    title='減少數量'
                                                >
                                                    <IconMinus />
                                                </button>
                                                <input
                                                    type='text'
                                                    className='mx-1 w-full rounded-lg p-1 text-center text-black dark:bg-neutral-800 dark:text-white'
                                                    size={1}
                                                    onChange={(e) => {
                                                        if (e.target.value === "") setCount(1)
                                                        else setCount(parseInt(e.target.value))
                                                    }}
                                                    value={count.toString()}
                                                    title='輸入數量'
                                                />
                                                <button
                                                    className='rounded-lg bg-amber-400 p-1 transition-all duration-300 hover:bg-amber-500 dark:text-neutral-900'
                                                    onClick={() => setCount(count + 1)}
                                                    title='增加數量'
                                                >
                                                    <IconPlus />
                                                </button>
                                            </div>
                                            <Dialog.Close asChild>
                                                <button
                                                    className='w-full rounded-lg bg-amber-400 p-1 transition-all duration-300 hover:bg-amber-500 dark:text-neutral-900'
                                                    onClick={() => {
                                                        addToCartAndNavigate(menu, count)
                                                        setCount(1)
                                                    }}
                                                >
                                                    加入購物車
                                                </button>
                                            </Dialog.Close>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Dialog.Description>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </>
    )
}

export default Order
