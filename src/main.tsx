// import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "@/App.tsx"
import "@/tailwind.css"
import "@/index.css"
import "react-toastify/dist/ReactToastify.css"
import "react-lazy-load-image-component/src/effects/blur.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
)
