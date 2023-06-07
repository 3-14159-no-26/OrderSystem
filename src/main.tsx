// import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { inject } from "@vercel/analytics"
import App from "@/App.tsx"
import "@/tailwind.css"
import "@/index.css"
inject()
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
)
