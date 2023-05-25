import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import URL from "@/url"
import Container from "@/components/container"

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
    const nodeRef = useRef(null)
    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(URL + "/menu")
            const data = await response.json()
            if (menuCategory !== "") {
                const filterData = data.filter((item: menu) => item.category === menuCategory)
                setMenu(filterData)
            } else {
                setMenu(data)
            }
            console.log(data)
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
                        <div className='flex flex-wrap w-3/4 max-md:w-full' ref={nodeRef}>
                            {menu.map((item: menu) => (
                                <div
                                    key={item.id}
                                    className='group relative bg-white rounded-lg shadow-md m-4 w-[200px] overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300  max-md:w-full max-md:h-[300px]'
                                >
                                    <div className='absolute top-[-100%] left-0 bg-white opacity-0 group-hover:top-0 group-hover:opacity-100 transition-all duration-300'>
                                        <img
                                            className='w-full h-full object-cover'
                                            src={"https://picsum.photos/500/500?random=" + item.id}
                                            alt=''
                                        />
                                        <div className='absolute top-0 left-0 p-4 w-full h-full'>
                                            <div className='flex justify-center items-center w-full h-full'>
                                                <div className=' bg-sky-600 p-1 rounded-lg'>
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
                                                className='w-[500px] h-[200px] object-cover'
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
                <div className='w-1/4 m-4 max-md:w-full'>
                    <div className='bg-white rounded-lg shadow-md p-2'>
                        {category.map((item: category) => (
                            <div key={item.id} className=''>
                                <div
                                    className='cursor-pointer'
                                    onClick={() =>
                                        selectCategory(item.name === "全部" ? "" : item.name)
                                    }
                                >
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Home
