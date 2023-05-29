import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { IconList } from "@tabler/icons-react"
import URL from "@/url"
import Container from "@/components/container"
import Loding from "@/pages/home/components/Loading"

type menu = {
    id: number
    name: string
    category: string
    price: number
}

type category = {
    id: number
    name: string
}

const Home = () => {
    const [menu, setMenu] = useState<menu[]>([])
    const [category, setCategory] = useState<category[]>([])
    const [menuCategory, setMenuCategory] = useState("")
    const [loading, setLoading] = useState(false)
    const [categoryLoading, setCategoryLoading] = useState(false)
    const nodeRef = useRef(null)
    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true)
            const response = await fetch(URL + "/menu")
            const data = await response.json()
            if (menuCategory !== "") {
                const filterData = data.filter((item: menu) => item.category === menuCategory)
                setMenu(filterData)
                console.log("你選擇的是", menuCategory, "數量", filterData.length, filterData)
            } else {
                setMenu(data)
                console.log("你選擇的是 全部", "數量", data.length, data)
            }
            setLoading(false)
        }
        fetchMenu()
    }, [menuCategory])
    useEffect(() => {
        setCategoryLoading(true)
        const fetchCategory = async () => {
            const response = await fetch(URL + "/category")
            const data = await response.json()
            setCategory(data)
            setCategoryLoading(false)
            console.log(data)
        }
        fetchCategory()
    }, [])

    const selectCategory = (name: string) => {
        console.log("click selectCategory", name)

        setMenuCategory(name)
    }

    const menutoggle = () => {
        const menuList = document.querySelector("#menu-list")
        // menuList?.classList.toggle("max-md:hidden")
        menuList?.classList.toggle("visible")
        menuList?.classList.toggle("fade-in")
    }

    return (
        <>
            <Container>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={menuCategory}
                        nodeRef={nodeRef}
                        // addEndListener={(node, done) => {
                        //     node.addEventListener("transitionend", done, false)
                        // }}
                        timeout={300}
                        classNames='menuCategory'
                        unmountOnExit
                    >
                        <div className='flex w-3/4 flex-wrap max-md:w-full' ref={nodeRef}>
                            {loading && <Loding />}
                            {menu.map((item: menu) => (
                                <div
                                    key={item.id}
                                    className='group relative m-4 w-[200px] overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg max-md:w-full'
                                >
                                    <div className='absolute left-0 top-[-100%] bg-white opacity-0 transition-all duration-300 group-hover:top-0 group-hover:opacity-100'>
                                        <img
                                            className='h-full w-full bg-cover object-cover'
                                            src={"https://picsum.photos/500/500?random=" + item.id}
                                            alt=''
                                        />
                                        <div className='absolute left-0 top-0 h-full w-full p-4'>
                                            <div className='flex h-full w-full items-center justify-center'>
                                                <div className=' rounded-lg bg-sky-600 p-1'>
                                                    <Link to={`/menu/${item.id}`}>
                                                        點擊查看詳情
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 transition-all duration-300'></div> */}
                                    <Link to={`/menu/${item.id}`}>
                                        <div className='h-[200px] overflow-hidden'>
                                            {/* transition-all duration-300 hover:scale-105 */}
                                            <img
                                                className='h-full w-full bg-cover object-cover'
                                                src={
                                                    "https://picsum.photos/500/500?random=" +
                                                    item.id
                                                }
                                                alt=''
                                            />
                                        </div>
                                        <div className='p-4'>
                                            <div className=''>{item.name}</div>
                                            <div className='text-right'>${item.price}</div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <div
                    className='w-1/4 max-md:fixed max-md:bottom-14 max-md:right-0 max-md:w-1/2'
                    id='menu-list'
                >
                    {categoryLoading ? (
                        <div className='bg-slate-200/9 m-4 animate-pulse rounded-lg p-2 shadow-md'>
                            <div className='p-1 text-xl font-medium max-md:hidden'>分類</div>
                            <div className='ml-1 mt-2 h-4 w-2/3 rounded-full bg-slate-200'></div>
                            <div className='flex justify-end'>
                                <div className='ml-1 mt-2 h-4 w-2/3 rounded-full bg-slate-200'></div>
                            </div>
                            <div className='ml-1 mt-2 h-4 w-2/3 rounded-full bg-slate-200'></div>
                            <div className='flex justify-end'>
                                <div className='ml-1 mt-2 h-4 w-2/3 rounded-full bg-slate-200'></div>
                            </div>
                        </div>
                    ) : (
                        <div className='m-4 rounded-lg bg-white p-2 shadow-md max-md:bg-[#ffa10099]'>
                            <div className='p-1 text-xl font-medium max-md:hidden'>分類</div>
                            <div className='p-1'>
                                {category.map((item: category) => (
                                    <div
                                        key={item.id}
                                        className='cursor-pointer rounded-lg p-2 hover:bg-gray-100 max-md:hover:bg-[#ffa10099]'
                                        onClick={() =>
                                            selectCategory(item.name === "全部" ? "" : item.name)
                                        }
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>
            <div
                className='fixed bottom-2 right-2 hidden h-14 w-14 cursor-pointer rounded-full bg-amber-400 p-4 max-md:block'
                onClick={menutoggle}
            >
                <IconList />
            </div>
        </>
    )
}

export default Home
