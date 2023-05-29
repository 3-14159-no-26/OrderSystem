import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import URL from "@/url"
import Container from "@/components/container"
import { IconList } from "@tabler/icons-react"

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
        const fetchCategory = async () => {
            const response = await fetch(URL + "/category")
            const data = await response.json()
            setCategory(data)
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
                            {loading && (
                                <div className='flex flex animate-pulse flex-wrap ring-slate-900/5'>
                                    <div className='m-4 rounded-xl bg-slate-900'>
                                        <div className='h-[200px] w-[200px] rounded-lg bg-slate-200'></div>{" "}
                                        <div className='flex flex-col justify-center p-4'>
                                            <div className='h-4 w-10 rounded-full bg-slate-200'></div>
                                            <div className='flex justify-end pt-4'>
                                                <div className='h-4 w-20 rounded-full bg-slate-200 text-right'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='m-4 rounded-xl bg-slate-900'>
                                        <div className='h-[200px] w-[200px] rounded-lg bg-slate-200'></div>{" "}
                                        <div className='flex flex-col justify-center p-4'>
                                            <div className='h-4 w-10 rounded-full bg-slate-200'></div>
                                            <div className='flex justify-end pt-4'>
                                                <div className='h-4 w-20 rounded-full bg-slate-200 text-right'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='m-4 rounded-xl bg-slate-900'>
                                        <div className='h-[200px] w-[200px] rounded-lg bg-slate-200'></div>{" "}
                                        <div className='flex flex-col justify-center p-4'>
                                            <div className='h-4 w-10 rounded-full bg-slate-200'></div>
                                            <div className='flex justify-end pt-4'>
                                                <div className='h-4 w-20 rounded-full bg-slate-200 text-right'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {menu.map((item: menu) => (
                                <div
                                    key={item.id}
                                    className='group relative m-4 w-[200px] overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg  max-md:h-[300px] max-md:w-full'
                                >
                                    <div className='absolute left-0 top-[-100%] bg-white opacity-0 transition-all duration-300 group-hover:top-0 group-hover:opacity-100'>
                                        <img
                                            className='h-full w-full object-cover'
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
                                        <div className='overflow-hidden'>
                                            {/* transition-all duration-300 hover:scale-105 */}
                                            <img
                                                className='h-[200px] w-[500px] object-cover'
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
