import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Login from "@/pages/login/components/Login"
import Register from "@/pages/login/components/Register"

const Index = () => {
    const [status, setStatus] = useState("login")
    const go = useNavigate()
    const token = Cookies.get("token")

    useEffect(() => {
        if (token) {
            go("/")
        }
    }, [])

    const handleStatus = (status: string) => {
        setStatus(status)
    }
    return (
        <>
            <div className='relative h-screen w-full'>
                <div className='absolute left-0 top-0 h-full w-full bg-slate-50'>
                    <div className='flex h-full w-full flex-grow flex-col items-center justify-center'>
                        {status === "login" ? (
                            <Login status={handleStatus} />
                        ) : (
                            <Register status={handleStatus} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
