import { useRoutes, useLocation } from "react-router-dom"
import routes from "./routes"
import { TransitionGroup, CSSTransition, SwitchTransition } from "react-transition-group"
import NavBar from "@/components/NavBar"
import { useRef } from "react"
import { MenuListProvider } from "./context/MenuList"

const App: React.FC = () => {
    const location = useLocation()
    const element = useRoutes(routes)
    const nodeRef = useRef(null)

    return (
        <>
            <MenuListProvider>
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
            </MenuListProvider>
        </>
    )
}

export default App
