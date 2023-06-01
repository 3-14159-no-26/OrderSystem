import { useRef } from "react"
import { useRoutes, useLocation } from "react-router-dom"
import { TransitionGroup, CSSTransition, SwitchTransition } from "react-transition-group"
import { MenuListProvider } from "./context/MenuList"
import routes from "./routes"
import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

const App: React.FC = () => {
    const location = useLocation()
    const element = useRoutes(routes)
    const nodeRef = useRef(null)

    return (
        <>
            <MenuListProvider>
                <div className='h-screen bg-slate-50'>
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
