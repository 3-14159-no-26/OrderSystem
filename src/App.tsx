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
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            // 系统处于黑暗模式
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#1f2937")
        } else {
            // 系统处于一般模式
            document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#ffffff")
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
