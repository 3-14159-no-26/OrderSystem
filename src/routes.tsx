import type { RouteObject } from "react-router-dom"
import Home from "@/pages/home"
import Menu from "@/pages/menu"
import Cart from "@/pages/cart"
import Details from "@/pages/details"
import Login from "@/pages/login"
import Admin from "@/pages/admin"
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
        path: "/details/:id",
        element: <Details />,
        children: [],
    },
    {
        path: "/login",
        element: <Login />,
        children: [],
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [],
    },
    {
        path: "*",
        element: <NotFound />,
        children: [],
    },
]

export default routes
