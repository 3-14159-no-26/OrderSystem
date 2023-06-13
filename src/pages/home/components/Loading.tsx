import { IconPhoto } from "@tabler/icons-react"

const Loding = () => {
    const item = () => {
        const item = []
        for (let i = 0; i < 12; i++) {
            item.push(
                <div className='flex w-full animate-pulse flex-wrap' key={i}>
                    <div className='w-full rounded-xl bg-white shadow-md dark:bg-[rgba(30,30,30,0.9)] dark:dark:text-white/60'>
                        <div className='h-[115px] w-full rounded-lg bg-slate-200 dark:bg-neutral-800 max-md:h-40'>
                            <div className='flex h-full items-center justify-center'>
                                <IconPhoto size={48} />
                                <div className='text-2xl'>圖片</div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center p-4'>
                            <div className='h-4 w-10 rounded-full bg-slate-200 dark:bg-neutral-800'></div>
                            <div className='flex justify-end pt-4'>
                                <div className='h-4 w-20 rounded-full bg-slate-200 text-right dark:bg-neutral-800'></div>
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
