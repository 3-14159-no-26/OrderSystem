import { Suspense, lazy } from "react"
import type { RouteObject } from "react-router-dom"
import Home from "@/pages/home"
// import Menu from "@/pages/menu"
import Cart from "@/pages/cart"
import Details from "@/pages/details"
import User from "@/pages/user"
import Login from "@/pages/login"
import AdminLogin from "@/pages/admin/components/Login"
const Admin = lazy(() => import("@/pages/admin"))
import API from "@/pages/api"
import NotFound from "@/pages/notFound"

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
        children: [],
    },
    // {
    //     path: "/menu/:id",
    //     element: <Menu />,
    //     children: [],
    // },
    {
        path: "/cart",
        element: <Cart />,
        children: [],
    },
    {
        path: "/details/:id?",
        element: <Details />,
        children: [],
    },
    {
        path: "/user",
        element: <User />,
        children: [],
    },
    {
        path: "/login",
        element: <Login />,
        children: [],
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
        children: [],
    },
    {
        path: "/admin",
        element: (
            <Suspense fallback={<div>載入中...</div>}>
                <Admin />
            </Suspense>
        ),
        children: [],
    },
    {
        path: "/api",
        element: <API />,
        children: [],
    },
    {
        path: "*",
        element: <NotFound />,
        children: [],
    },
]

export default routes
