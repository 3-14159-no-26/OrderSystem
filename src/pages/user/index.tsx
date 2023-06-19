import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    IconUser,
    IconHistory,
    IconArrowRight,
    IconPhone,
    IconMail,
    IconApi,
} from "@tabler/icons-react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import Cookies from "js-cookie"
import gravatar from "gravatar"
import Container from "@/components/Container"
import EditUser from "./components/Edit"
import URL from "@/url"

type UserInfo = {
    username: string
    name: string
    email: string
    phone: string
    address: string
}

const User = () => {
    const go = useNavigate()
    const [avatar, setAvatar] = useState("")
    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    })
    const token = Cookies.get("token")

    useEffect(() => {
        if (!token) {
            go("/login")
        } else {
            const fetchData = async () => {
                const res = await fetch(URL + "/info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        customerID: token,
                    }),
                })
                const data = (await res.json()) as UserInfo
                setAvatar(gravatar.url(data.email, { s: "100", r: "g", d: "mm" }))
                setUserInfo(data)
                console.log(data)
            }
            fetchData()
        }
    }, [])

    return (
        <Container>
            <div className='flex h-[80vh] w-full justify-center'>
                <div className='w-2/3 rounded-lg bg-white p-8 shadow-md dark:bg-neutral-900 dark:text-white/60 max-md:w-full max-md:bg-transparent max-md:shadow-none max-md:dark:bg-transparent'>
                    <div className='flex items-center justify-around border-b-2 p-4'>
                        <div className='h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-full'>
                            <LazyLoadImage
                                src={avatar}
                                alt=''
                                className='h-full w-full bg-cover object-cover'
                            />
                        </div>
                        <div className=''>
                            <div className='text-center text-4xl'>{userInfo.username}</div>
                            <div className='pt-3 text-center'>
                                {token && <EditUser token={token} />}
                            </div>
                        </div>
                    </div>

                    <div
                        id='order-history'
                        className='my-2 flex w-full cursor-pointer items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'
                        onClick={() =>
                            go("/details", {
                                state: { orderStatus: "C" },
                            })
                        }
                    >
                        <div className='flex items-center'>
                            <IconHistory size={24} />
                            <div className='pl-2 text-2xl'>點餐記錄</div>
                        </div>
                        <div className='relative h-6 w-6'>
                            <IconArrowRight
                                size={24}
                                className='icon-arrow-right absolute top-0 transform cursor-pointer'
                            />
                        </div>
                    </div>
                    <div className='border-b-2 dark:border-neutral-800'></div>
                    <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                        <div className='flex items-center'>
                            <IconUser size={24} />
                            <div className='pl-2 text-2xl'>姓名</div>
                        </div>
                        <div className='text-2xl'>{userInfo.name}</div>
                    </div>
                    <div className='border-b-2 dark:border-neutral-800'></div>
                    <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                        <div className='flex items-center'>
                            <IconMail size={24} />
                            <div className='pl-2 text-2xl'>Email</div>
                        </div>
                        <div className='text-2xl'>{userInfo.email}</div>
                    </div>
                    <div className='border-b-2 dark:border-neutral-800'></div>
                    <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                        <div className='flex items-center'>
                            <IconPhone size={24} />
                            <div className='pl-2 text-2xl'>電話</div>
                        </div>
                        <div className='text-2xl'>{userInfo.phone}</div>
                    </div>
                    <div className='border-b-2 dark:border-neutral-800'></div>
                    <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                        <div className='flex items-center'>
                            <IconPhone size={24} />
                            <div className='pl-2 text-2xl'>地址</div>
                        </div>
                        <div className='text-2xl'>{userInfo.address}</div>
                    </div>
                    <div
                        id='order-api'
                        className='my-2 flex w-full cursor-pointer items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'
                        onClick={() => go("/api")}
                    >
                        <div className='flex items-center'>
                            <IconApi size={24} />
                            <div className='pl-2 text-2xl'>API文件</div>
                        </div>
                        <div className='relative h-6 w-6'>
                            <IconArrowRight
                                size={24}
                                className='icon-arrow-right absolute top-0 transform cursor-pointer'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default User
