import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IconUser, IconHistory, IconArrowRight } from "@tabler/icons-react"
import Cookies from "js-cookie"
import gravatar from "gravatar"
import Container from "@/components/Container"

const User = () => {
    const go = useNavigate()
    const token = Cookies.get("token")
    const avatar = gravatar.url("xxx911209@gmail.com", { s: "100", r: "g", d: "mm" })

    useEffect(() => {
        if (!token) {
            go("/login")
        }
    }, [])

    return (
        <Container>
            <div className='flex h-[80vh] w-full justify-center'>
                <div className='w-2/3 rounded-lg bg-white p-8 shadow-md max-md:w-full max-md:bg-transparent max-md:shadow-none'>
                    <div className='flex items-center justify-around border-b-2 p-4'>
                        <div className='h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-full'>
                            <img
                                src={avatar}
                                alt=''
                                className='h-full w-full bg-cover object-cover'
                            />
                        </div>
                        <div className='text-4xl'>only</div>
                    </div>
                    <div
                        id='order-history'
                        className='group my-2 flex w-full cursor-pointer items-center justify-between rounded-2xl p-2 hover:bg-gray-100'
                    >
                        <div className='flex items-center'>
                            <IconHistory size={24} />
                            <div className='pl-2 text-2xl'>點餐記錄</div>
                        </div>
                        <div className='relative h-6 w-6'>
                            <IconArrowRight
                                size={24}
                                id='icon-arrow-right'
                                className='absolute top-0 transform cursor-pointer'
                            />
                        </div>
                    </div>
                    <div className='border-b-2'></div>
                    <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100'>
                        <div className='flex items-center'>
                            <IconUser size={24} />
                            <div className='pl-2 text-2xl'>姓名</div>
                        </div>
                        <div className='text-2xl'>XXX</div>
                    </div>
                    <div className='border-b-2'></div>
                </div>
            </div>
        </Container>
    )
}

export default User
