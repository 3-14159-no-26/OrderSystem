import { useState, useEffect, Suspense, lazy } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
const Login = lazy(() => import("@/pages/login/components/Login"))
const Register = lazy(() => import("@/pages/login/components/Register"))
// import Login from "@/pages/login/components/Login"
// import Register from "@/pages/login/components/Register"

const Index = () => {
    const [status, setStatus] = useState("login")
    const go = useNavigate()

    useEffect(() => {
        const token = Cookies.get("token")
        if (token) {
            go("/")
        }
    }, [])

    const handleStatus = (status: string) => {
        setStatus(status)
    }
    return (
        <>
            <div className='relative h-[91.7vh] w-full'>
                <div className='absolute left-0 top-0 h-full w-full bg-slate-50 dark:bg-[#0f0f0f]'>
                    <div className='flex h-full w-full flex-grow flex-col items-center justify-center'>
                        {status === "login" ? (
                            <Suspense fallback={<div>載入中...</div>}>
                                <Login status={handleStatus} />
                            </Suspense>
                        ) : (
                            <Suspense fallback={<div>載入中...</div>}>
                                <Register status={handleStatus} />
                            </Suspense>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
