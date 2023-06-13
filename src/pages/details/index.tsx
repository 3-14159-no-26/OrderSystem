import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import URL from "@/url"
import Container from "@/components/Container"
import { MenuItemType } from "@/types"
import Cookies from "js-cookie"
// import MenuItem from "@/pages/cart/components/CartItem"

type MenuListType = MenuItemType[]

const Details = () => {
    const { id } = useParams()
    const [data, setData] = useState<MenuListType>([])

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get("token")
            const res = await fetch(`${URL}/details/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerID: token,
                    orderID: id,
                }),
            })
            const data = await res.json()
            setData(data.list)
        }
        fetchData()
    }, [])

    return (
        <>
            <Container>
                {data.map((item) => (
                    <div key={item.id}>
                        <div className=''>{item.name}</div>
                    </div>
                ))}
            </Container>
        </>
    )
}

export default Details
