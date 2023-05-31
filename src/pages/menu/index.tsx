import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import { ToastContainer, toast } from "react-toastify"
import { IconPlus, IconMinus } from "@tabler/icons-react"
import "react-toastify/dist/ReactToastify.css"
import URL from "@/url"
import Container from "@/components/Container"
import Loding from "@/pages/menu/components/Loading"

type menu = {
    id: number
    name: string
    category: string
    price: number
}

const Menu = () => {
    const { id } = useParams()
    const location = useLocation()
    const go = useNavigate()
    const [data, setData] = useState<menu>()
    const [count, setCount] = useState(1)
    const [loading, setLoading] = useState(false)
    const { menuList, addToCart } = useMenuListContext()

    // 讀取目前採購量
    useEffect(() => {
        console.log("商品ID", id, "讀取目前採購量", menuList)
        if (id) {
            const index = menuList.findIndex((e) => e.id == parseInt(id))
            if (index !== -1) {
                setCount(menuList[index].count)
            }
        }
    }, [menuList])

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const response = await fetch(`${URL}/menu/${id}`)
            const data = await response.json()
            setData(data)
            setLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data) {
            console.log(data.name, count, "加入購物車")
        }
    }, [menuList])

    const addToCartAndNavigate = (data: menu, count: number) => {
        addToCart(data, count)
        notify()
        // 通知完成自動跳轉
        // 如果是從購物車頁面來的，就回到購物車頁面
        console.log("上一頁", location.state?.prevPath)

        if (location.state?.prevPath === "/cart") {
            setTimeout(() => {
                go("/cart")
            }, 2500)
        }
        // 如果是從首頁來的，就回到首頁
        else {
            setTimeout(() => {
                go("/")
            }, 2500)
        }
    }

    const notify = () =>
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("加入購物車成功")
                }, 500)
            }),
            {
                pending: "加入購物車中...",
                success: "加入購物車成功",
                error: "加入購物車失敗",
            }
        )

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
                <div className='w-full'>
                    <h1>Menu</h1>
                    <div className='flex flex-col items-center justify-center'>
                        {loading && <Loding />}
                        {data && (
                            <div className=' rounded-md bg-slate-300  p-2 shadow-md'>
                                <div className='overflow-hidden'>
                                    <img
                                        src={"https://picsum.photos/200/100?random=" + data.id}
                                        alt=''
                                    />
                                </div>
                                <div className=''>{data.name}</div>
                                <div className=''>${data.price}</div>
                                <div className='flex items-center py-2'>
                                    <button
                                        className='rounded-lg bg-amber-400 p-1'
                                        onClick={() => {
                                            if (count > 1) setCount(count - 1)
                                        }}
                                    >
                                        <IconMinus />
                                    </button>
                                    <input
                                        type='text'
                                        className='mx-1 w-full rounded-lg p-1 text-center'
                                        size={1}
                                        onChange={(e) => {
                                            if (e.target.value === "") setCount(1)
                                            else setCount(parseInt(e.target.value))
                                        }}
                                        value={count.toString()}
                                    />
                                    <button
                                        className='rounded-lg bg-amber-400 p-1'
                                        onClick={() => setCount(count + 1)}
                                    >
                                        <IconPlus />
                                    </button>
                                </div>
                                <button
                                    className='w-full rounded-lg bg-amber-400 p-1'
                                    onClick={() => addToCartAndNavigate(data, count)}
                                >
                                    加入購物車
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Menu
