import { IconChevronDown } from "@tabler/icons-react"
import * as Accordion from "@radix-ui/react-accordion"

const PUT = () => {
    return (
        <>
            <Accordion.Item value='2'>
                <Accordion.Header>
                    <Accordion.Trigger className='flex w-full items-center justify-between rounded-md border border-[#fca130] bg-[#fca1301a] p-1 transition-all [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:rounded-none [&[data-state=open]]:rounded-t-md'>
                        <div className='flex items-center'>
                            <div className='w-24 rounded-md bg-[#E97500] px-4 py-2'>
                                <span className='font-bold text-white'>PUT</span>
                            </div>
                            <div className='px-3 font-semibold'>
                                <code>/api</code>
                            </div>
                        </div>
                        <IconChevronDown className='transition-transform duration-200' />
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                    <div className='rounded-b-md border-x border-b border-[#fca130] bg-[#fca1301a]'>
                        <p>內容</p>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </>
    )
}

export default PUT
