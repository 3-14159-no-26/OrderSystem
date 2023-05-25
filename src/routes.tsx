import type { RouteObject } from "react-router-dom"
import Home from "@/pages/home"
import Menu from "@/pages/menu"
import Cart from "./pages/cart"
import NotFound from "@/pages/notFound"

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
        children: [],
    },
    {
        path: "/menu/:id",
        element: <Menu />,
        children: [],
    },
    {
        path: "/cart",
        element: <Cart />,
        children: [],
    },
    {
        path: "*",
        element: <NotFound />,
        children: [],
    },
]

export default routes
