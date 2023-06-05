import { useState } from "react"
import { IconChevronDown } from "@tabler/icons-react"
import * as Accordion from "@radix-ui/react-accordion"
import Container from "@/components/Container"
import POST from "./components/post"
import PUT from "./components/put"
import DELETE from "./components/delete"

const API = () => {
    return (
        <>
            <Container>
                <Accordion.Root type='multiple' className='w-full'>
                    <POST />
                    <PUT />
                    <DELETE />
                </Accordion.Root>
            </Container>
        </>
    )
}

export default API
