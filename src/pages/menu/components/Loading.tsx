const Loding = () => {
    return (
        <div className='flex animate-pulse flex-wrap ring-slate-900/5'>
            <div className='m-4 rounded-xl bg-slate-900 p-2 '>
                <div className='h-[100px] w-[200px] rounded-lg bg-slate-200'></div>
                <div className='flex flex-col justify-center p-4'>
                    <div className='h-4 w-10 rounded-full bg-slate-200'></div>
                    <div className='mt-2 h-4 w-20 rounded-full bg-slate-200'></div>
                    <div className='flex'>
                        <div className='mr-1 mt-2 h-4 w-full rounded-full bg-slate-200'></div>
                        <div className='mx-1 mt-2 h-4 w-full rounded-full bg-slate-200'></div>
                        <div className='ml-1 mt-2 h-4 w-full rounded-full bg-slate-200'></div>
                    </div>
                    <div className='mt-2 h-4 w-full rounded-full bg-slate-200'></div>
                </div>
            </div>
        </div>
    )
}

export default Loding
