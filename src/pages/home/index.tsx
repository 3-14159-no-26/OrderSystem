import { useState, useEffect, useRef } from "react"
// import { Link } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { IconList } from "@tabler/icons-react"
import { MenuType } from "@/types"
import URL from "@/url"
import Container from "@/components/Container"
import Loding from "@/pages/home/components/Loading"
import * as Dialog from "@radix-ui/react-dialog"
import Order from "@/components/Order"
import { ToastContainer, toast } from "react-toastify"

type category = {
    id: number
    name: string
}

type CategoryListType = {
    [key: string]: string
}

const CategoryList: CategoryListType = {
    AL: "全部",
    MM: "主餐",
    SM: "副餐",
    DR: "飲料",
    SN: "甜點",
}

const Home = () => {
    const [menu, setMenu] = useState<MenuType[]>([])
    const [category, setCategory] = useState<category[]>([])
    const [menuCategory, setMenuCategory] = useState<MenuType[]>([])
    const [categoryID, setCategoryID] = useState("")
    const [loading, setLoading] = useState(false)
    const [categoryLoading, setCategoryLoading] = useState(false)
    const nodeRef = useRef(null)

    useEffect(() => {
        const fetchMenu = async () => {
            setLoading(true)
            const response = await fetch(URL + "/menu")
            const data = await response.json()
            setMenu(data)
            setMenuCategory(data)
            setLoading(false)
        }
        fetchMenu()
    }, [])

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
        if (name !== "") {
            const filterData = menu.filter((item: MenuType) => item.category === name)
            setMenuCategory(filterData)
            console.log("你選擇的是", name, "數量", filterData.length, filterData)
        } else {
            setMenuCategory(menu)
            console.log("你選擇的是 全部", "數量", menu.length, menu)
        }
        setCategoryID(name)
    }

    const menutoggle = () => {
        const menuList = document.querySelector("#menu-list")
        // menuList?.classList.toggle("max-md:hidden")
        menuList?.classList.toggle("visible")
        menuList?.classList.toggle("fade-in")
    }

    const notify = () =>
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("加入購物車成功")
                }, 200)
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
                autoClose={400}
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
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={categoryID}
                        nodeRef={nodeRef}
                        // addEndListener={(node, done) => {
                        //     node.addEventListener("transitionend", done, false)
                        // }}
                        timeout={300}
                        classNames='menuCategory'
                        unmountOnExit
                    >
                        <div
                            className='grid w-3/4 grid-cols-3 gap-4 p-4 max-lg:grid-cols-2 max-md:w-full max-md:grid-cols-1'
                            ref={nodeRef}
                        >
                            {loading && <Loding />}
                            {menuCategory.map((item: MenuType) => (
                                <div key={item.id}>
                                    {/* <div className='absolute w-full h-full top-0 left-0 opacity-0 hover:opacity-100 transition-all duration-300'></div> */}
                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <div className='group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-[rgba(30,30,30,0.9)] dark:dark:text-white/60'>
                                                <div className='flex h-[115px] w-full justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 max-md:h-40'>
                                                    {/* transition-all duration-300 hover:scale-105 */}
                                                    <LazyLoadImage
                                                        className='m-auto h-full w-auto'
                                                        src={
                                                            "/static/img/meals/" +
                                                            item.cover +
                                                            ".webp"
                                                        }
                                                        placeholderSrc={
                                                            "/static/img/lazymeals/" +
                                                            item.cover +
                                                            ".webp"
                                                        }
                                                        effect='blur'
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='p-4'>
                                                    <div className=''>{item.name}</div>
                                                    <div className='text-right'>${item.price}</div>
                                                </div>
                                            </div>
                                        </Dialog.Trigger>
                                        <Order menu={item} notify={notify} />
                                    </Dialog.Root>
                                </div>
                            ))}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
                <div
                    className='w-1/4 max-md:fixed max-md:bottom-32 max-md:right-0 max-md:w-1/2'
                    id='menu-list'
                >
                    {categoryLoading ? (
                        <div className='m-4 animate-pulse rounded-lg bg-white p-2 shadow-md dark:bg-[rgba(30,30,30,0.8)] dark:dark:text-white/60 max-md:bg-[#ffa10099]'>
                            <div className='p-1 text-xl max-md:hidden'>分類</div>
                            {/* font-medium */}
                            <div className='mx-1 mt-5 h-4 w-2/3 rounded-full bg-slate-200 dark:bg-neutral-800'></div>
                            <div className='flex justify-end'>
                                <div className='mx-1 mt-5 h-4 w-2/3 rounded-full bg-slate-200 dark:bg-neutral-800'></div>
                            </div>
                            <div className='mx-1 mt-5 h-4 w-2/3 rounded-full bg-slate-200 dark:bg-neutral-800'></div>
                            <div className='flex justify-end'>
                                <div className='mx-1 mt-5 h-4 w-2/3 rounded-full bg-slate-200 dark:bg-neutral-800'></div>
                            </div>
                            <div className='mx-1 mt-5 h-4 w-2/3 rounded-full bg-slate-200 dark:bg-neutral-800'></div>
                        </div>
                    ) : (
                        <div className='m-4 rounded-lg bg-white p-2 shadow-md dark:bg-[rgba(30,30,30,0.8)] dark:dark:text-white/60 max-md:bg-[#ffa10099]'>
                            <div className='p-1 text-xl max-md:hidden'>分類</div>
                            {/* font-medium */}
                            <div className='p-1'>
                                {category.map((item: category) => (
                                    <div
                                        key={item.id}
                                        className='cursor-pointer rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 max-md:hover:bg-[#ffa10099]'
                                        onClick={() =>
                                            selectCategory(item.name === "AL" ? "" : item.name)
                                        }
                                    >
                                        {CategoryList[item.name]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Container>
            <div
                className='fixed bottom-20 right-2 hidden h-14 w-14 cursor-pointer rounded-full bg-amber-400 p-4 max-md:block'
                onClick={menutoggle}
            >
                <IconList />
            </div>
        </>
    )
}

export default Home
