import { IconPhoto } from "@tabler/icons-react"

const Loding = () => {
    const item = () => {
        const item = []
        for (let i = 0; i < 12; i++) {
            item.push(
                <div className='flex w-full animate-pulse flex-wrap ring-slate-900/5' key={i}>
                    <div className='w-full rounded-xl bg-slate-900'>
                        <div className='h-[115px] w-full rounded-lg bg-slate-200 max-md:h-40'>
                            <div className='flex h-full items-center justify-center'>
                                <IconPhoto size={48} />
                                <div className='text-2xl'>圖片</div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center p-4'>
                            <div className='h-4 w-10 rounded-full bg-slate-200'></div>
                            <div className='flex justify-end pt-4'>
                                <div className='h-4 w-20 rounded-full bg-slate-200 text-right'></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return item
    }

    return <>{item()}</>
}

export default Loding
