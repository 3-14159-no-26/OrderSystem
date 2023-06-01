import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Container from "@/components/Container"

const User = () => {
    const go = useNavigate()
    const token = Cookies.get("token")

    useEffect(() => {
        if (!token) {
            go("/login")
        }
    }, [])

    return (
        <Container>
            <div>
                <div className=''>User</div>
            </div>
        </Container>
    )
}

export default User
