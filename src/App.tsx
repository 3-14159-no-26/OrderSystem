import { useEffect, useRef } from "react"
import { useRoutes, useLocation } from "react-router-dom"
import { TransitionGroup, CSSTransition, SwitchTransition } from "react-transition-group"
import { MenuListProvider } from "./context/MenuList"
import { inject } from "@vercel/analytics"
import routes from "./routes"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

inject()

const App = () => {
    const location = useLocation()
    const element = useRoutes(routes)
    const nodeRef = useRef(null)

    useEffect(() => {
        const root = document.documentElement
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches

        // 初始设置主题
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && prefersDarkScheme)) {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [])

    return (
        <>
            <MenuListProvider>
                <div className='bg-slate-50'>
                    <NavBar />
                    <TransitionGroup>
                        <SwitchTransition mode='out-in'>
                            <CSSTransition
                                key={location.key}
                                nodeRef={nodeRef}
                                classNames='page'
                                timeout={300}
                                // apper={true}
                                unmountOnExit
                            >
                                <div ref={nodeRef}>{element}</div>
                            </CSSTransition>
                        </SwitchTransition>
                    </TransitionGroup>
                    <Footer />
                </div>
            </MenuListProvider>
        </>
    )
}

export default App
