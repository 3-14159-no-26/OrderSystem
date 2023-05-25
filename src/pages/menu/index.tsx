import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MenuListProvider, useMenuListContext } from "@/context/MenuList"
import URL from "@/url"
import NavBar from "@/components/NavBar"
import Container from "@/components/container"
import { IconPlus, IconMinus } from "@tabler/icons-react"

type menu = {
    id: number
    name: string
    category: string
    price: number
}

const Menu = () => {
    const { id } = useParams()
    const [data, setData] = useState<menu>()
    const [count, setCount] = useState(1)
    const { menuList, addToCart } = useMenuListContext()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${URL}/menu/${id}`)
            const data = await response.json()
            setData(data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (data) {
            console.log(data.name, count, "加入購物車")
        }
    }, [menuList])

    return (
        <>
            {/* <NavBar /> */}
            <Container>
                <div className='w-full'>
                    <h1>Menu</h1>
                    <div className='flex items-center justify-center'>
                        {data && (
                            <div className=' bg-slate-300 p-2  rounded-md shadow-md'>
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
                                        className='bg-amber-400 p-1 rounded-lg'
                                        onClick={() => {
                                            if (count > 1) setCount(count - 1)
                                        }}
                                    >
                                        <IconMinus />
                                    </button>
                                    <input
                                        type='text'
                                        className='text-center mx-1 p-1 rounded-lg w-full'
                                        size={1}
                                        onChange={(e) => {
                                            if (e.target.value === "") setCount(1)
                                            else setCount(parseInt(e.target.value))
                                        }}
                                        value={count.toString()}
                                    />
                                    <button
                                        className='bg-amber-400 p-1 rounded-lg'
                                        onClick={() => setCount(count + 1)}
                                    >
                                        <IconPlus />
                                    </button>
                                </div>
                                <button
                                    className='bg-amber-400 p-1 rounded-lg w-full'
                                    onClick={() => addToCart(data, count)}
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
