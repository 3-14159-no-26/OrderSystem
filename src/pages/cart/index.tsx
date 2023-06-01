import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import { v4 as uuidv4 } from "uuid"
import { ToastContainer, toast } from "react-toastify"
// import URL from "@/url"
import Cookies from "js-cookie"
import Container from "@/components/Container"
import MenuItem from "@/pages/cart/components/CartItem"

const Cart = () => {
    const [login, setLogin] = useState(false)
    const go = useNavigate()
    const { menuList, resetToCart } = useMenuListContext()
    const id = uuidv4()
    const token = Cookies.get("token")

    useEffect(() => {
        if (token) {
            setLogin(true)
        } else {
            setLogin(false)
        }
    }, [])

    // 送出訂單 POST /order
    const submitOrder = async () => {
        //     // 送出訂單
        //     console.log("送出訂單", menuList)
        //     const response = await fetch(URL + "/order", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             id: uuidv4(),
        //             list: menuList,
        //         }),
        //     })
        //     const data = await response.json()
        //     console.log("訂單編號", data.id)
        // 清空購物車

        if (token) {
            // 送出訂單
            resetToCart()
            toast("🛒已送出訂單")
            // 跳轉到訂單頁面
            go("/details/" + id)
        } else {
            go("/login")
        }
    }

    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <Container>
                <div className='w-full rounded-2xl border-2 border-black bg-[#efa987]'>
                    <div className='relative z-10 m-[-2px] h-40 border-collapse rounded-2xl border-2 border-black px-4 pb-4 shadow-xl'>
                        <div className='flex h-full w-full items-center justify-center rounded-b-xl border-x-2 border-b-2 border-dashed border-[#ae7252]'>
                            <div className=''>
                                <div className='m-2 flex items-center justify-center'>
                                    <div className='text-3xl'>WH Eats 帳單本</div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='rounded-full border-2 border-dashed border-black bg-[#fbc3a5] px-4 py-1'>
                                        記得要結帳喔~
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-4 pb-4'>
                        <div className='rounded-b-xl border-x-2 border-b-2 border-dashed border-[#ae7252] px-4 pb-4'>
                            <div className='relative'>
                                <div className='details-list '>
                                    <div className='w-full bg-white p-4'>
                                        {/* 如果 menuList 是空的就顯示 尚未加入購物車, 否則就顯示總計 */}
                                        {menuList.length !== 0 ? (
                                            <>
                                                <div className='flex items-center justify-center p-4'>
                                                    <div className='text-3xl'>單號: {id}</div>
                                                </div>
                                                <div className='flex items-center justify-center px-4 pb-4'>
                                                    <div className='text-2xl'>時間 2023/09/87</div>
                                                </div>
                                                <MenuItem menuList={menuList} />
                                                <div className='border-b-2 border-gray-200'>
                                                    <div className='flex justify-between text-2xl'>
                                                        <div className='p-2'>總計</div>
                                                        <div className='p-2'>
                                                            {menuList.reduce((total, item) => {
                                                                console.log(
                                                                    "目前加總",
                                                                    total,
                                                                    "目前項目 =>",
                                                                    "單價",
                                                                    item.price,
                                                                    "數量",
                                                                    item.count
                                                                )
                                                                return (
                                                                    total + item.price * item.count
                                                                )
                                                            }, 0)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className='border-b-2 border-gray-200'>
                                                <div className='flex justify-center text-2xl'>
                                                    <div className='p-2'>尚未加入購物車</div>
                                                </div>
                                            </div>
                                        )}
                                        <div className='mt-4 flex'>
                                            <button
                                                className='m-1 w-full rounded-lg bg-amber-400 p-2'
                                                onClick={() => {
                                                    resetToCart()
                                                    toast("🛒已清空購物車")
                                                }}
                                            >
                                                清空購物車
                                            </button>
                                            <button
                                                className='m-1 w-full rounded-lg bg-amber-400 p-2'
                                                onClick={() => {
                                                    submitOrder()
                                                }}
                                            >
                                                {login ? "送出訂單" : "請先登入"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart
