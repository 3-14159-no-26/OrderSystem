import { useState } from "react"
import Container from "@/components/Container"
import Login from "@/pages/login/components/Login"
import Register from "@/pages/login/components/Register"

const Index = () => {
    const [status, setStatus] = useState("register")
    const handleStatus = (status: string) => {
        setStatus(status)
    }
    return (
        <>
            <Container>
                <div className='absolute left-0 top-0 h-full w-full bg-slate-50'>
                    <div className='flex h-full w-full flex-grow flex-col items-center justify-center'>
                        {status === "login" ? (
                            <Login status={handleStatus} />
                        ) : (
                            <Register status={handleStatus} />
                        )}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Index
