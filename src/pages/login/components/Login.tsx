import { IconUserCircle, IconLock } from "@tabler/icons-react"

const Login = ({ status }: { status: (status: string) => void }) => {
    return (
        <>
            <div className='m-2 flex flex-col items-center justify-center rounded-lg bg-white p-2 shadow'>
                <div className='p-2 text-xl font-semibold'>歡迎使用！線上訂餐系統</div>
                <div className='p-2'>請選擇登入/註冊方式，註冊後即可使用</div>
                <div className=''>
                    <button
                        className='rounded-lg bg-red-300 px-4 py-1'
                        onClick={() => {
                            status("register")
                        }}
                    >
                        註冊
                    </button>
                </div>
            </div>
            <div className='rounded-xl bg-slate-300 p-4 max-md:min-w-full max-md:bg-transparent'>
                <div className='m-4 flex items-center rounded-full border border-gray-400 bg-white p-1 text-xl hover:border-gray-600 max-md:mx-0'>
                    <IconUserCircle className='px-2' size={40} />
                    <input
                        type='text'
                        className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                    />
                </div>
                <div className='m-4 flex items-center rounded-full border border-gray-400 bg-white p-1 text-xl hover:border-gray-600 max-md:mx-0'>
                    <IconLock className='px-2' size={40} />
                    <input
                        type='text'
                        className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                    />
                </div>
                <div className='m-4 max-md:mx-0'>
                    <button type='submit' className='w-full rounded-lg bg-amber-400 p-2'>
                        登入
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login
