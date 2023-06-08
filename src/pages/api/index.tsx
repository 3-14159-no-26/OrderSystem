import { Suspense, lazy } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import Container from "@/components/Container"
const POST = lazy(() => import("@/pages/api/components/post"))
const PUT = lazy(() => import("@/pages/api/components/put"))
const DELETE = lazy(() => import("@/pages/api/components/delete"))

const API = () => {
    return (
        <>
            <Container>
                <Accordion.Root type='multiple' className='w-full'>
                    <Suspense fallback={<div>載入中...</div>}>
                        <POST />
                    </Suspense>
                    <Suspense fallback={<div>載入中...</div>}>
                        <PUT />
                    </Suspense>
                    <Suspense fallback={<div>載入中...</div>}>
                        <DELETE />
                    </Suspense>
                </Accordion.Root>
            </Container>
        </>
    )
}

export default API
