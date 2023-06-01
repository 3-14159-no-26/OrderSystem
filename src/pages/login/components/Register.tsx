import { useState, useEffect } from "react"
import { IconMail, IconUserCircle, IconLock, IconExclamationCircle } from "@tabler/icons-react"
import clsx from "clsx"

const Register = ({ status }: { status: (status: string) => void }) => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false)
    // const [errorPassword, setErrorPassword] = useState(false)
    // const [errorPassword2, setErrorPassword2] = useState(false)

    useEffect(() => {
        const isValiEmail = () => {
            const re = /\S+@\S+\.\S+/
            return re.test(email)
        }
        if (!isValiEmail()) {
            console.log("請輸入有效的電子郵件地址")
            setErrorEmail(true)
        } else {
            console.log("email is valid")
            setErrorEmail(false)
        }
    }, [email])

    useEffect(() => {
        const isValiUsername = () => {
            // 必須是6-20位字符且要包含一個英文其他的都是數字能用 - _
            const re = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/
            return re.test(username)
        }
        if (!isValiUsername()) {
            console.log(
                "包含至少一個字母和一個數字，且只能由字母和數字組成，長度介於 6 到 20 個字符之間。"
            )
            setErrorUsername(true)
        } else {
            console.log("username is valid")
            setErrorUsername(false)
        }
    }, [username])

    useEffect(() => {
        const isValiPassword = () => {
            // 必須是6-20位字符且要包含一個英文其他的都是數字能用 - _
            const re = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/
            return re.test(password)
        }
        if (!isValiPassword()) {
            console.log(
                "包含至少一個字母和一個數字，且只能由字母和數字組成，長度介於 6 到 20 個字符之間。"
            )
            setErrorPassword(true)
        } else {
            console.log("password is valid")
            setErrorPassword(false)
        }
    }, [password])

    useEffect(() => {
        const isValiPassword2 = () => {
            return password === password2
        }
        if (!isValiPassword2()) {
            console.log("兩次輸入的密碼不一致")
            setErrorPassword2(true)
        } else {
            console.log("password2 is valid")
            setErrorPassword2(false)
        }
    }, [password2])

    useEffect(() => {
        setErrorEmail(false)
        setErrorUsername(false)
        setErrorPassword(false)
        setErrorPassword2(false)
    }, [])
    const register = () => {
        console.log("register")
    }

    return (
        <>
            <div className='m-2 flex flex-col items-center justify-center rounded-lg bg-white p-2 shadow'>
                <div className='p-2 text-xl font-semibold'>歡迎使用！線上訂餐系統</div>
                <div className='p-2'>請選擇登入/註冊方式，註冊後即可使用</div>
                <div className=''>
                    <button
                        className='rounded-lg bg-red-300 px-4 py-1'
                        onClick={() => {
                            status("login")
                        }}
                    >
                        登入
                    </button>
                </div>
            </div>
            <div className='w-96 rounded-xl bg-slate-300 p-4 max-md:min-w-full max-md:bg-transparent'>
                {/* 如果驗證email 顯示 border-gray-400 否則 border-red-500 border-2 */}
                <div className='m-4 '>
                    <div
                        className={clsx(
                            "flex items-center rounded-full border bg-white p-1 text-xl max-md:mx-0",
                            errorEmail
                                ? "border-2 border-red-500"
                                : "border-gray-400 hover:border-gray-600"
                        )}
                    >
                        <IconMail className='px-2' size={40} />
                        <input
                            type='email'
                            className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorEmail ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorEmail && (
                        <div className='text-right text-red-500'>請輸入有效的電子郵件地址</div>
                    )}
                </div>
                <div className='m-4'>
                    <div
                        className={clsx(
                            "flex items-center rounded-full border bg-white p-1 text-xl max-md:mx-0",
                            errorUsername
                                ? "border-2 border-red-500"
                                : "border-gray-400 hover:border-gray-600"
                        )}
                    >
                        <IconUserCircle className='px-2' size={40} />
                        <input
                            type='text'
                            className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                            value={username}
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorUsername ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorUsername && (
                        <div className='text-right text-red-500'>
                            包含至少一個字母和一個數字，且只能由字母和數字組成，長度介於 6 到 20
                            個字符之間。
                        </div>
                    )}
                </div>
                <div className='m-4 flex items-center rounded-full border border-gray-400 bg-white p-1 text-xl hover:border-gray-600 max-md:mx-0'>
                    <IconLock className='px-2' size={40} />
                    <input
                        type='password'
                        className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                </div>

                <div className='m-4 flex items-center rounded-full border border-gray-400 bg-white p-1 text-xl hover:border-gray-600 max-md:mx-0'>
                    <IconLock className='px-2' size={40} />
                    <input
                        type='password'
                        className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                        onChange={(e) => {
                            setPassword2(e.target.value)
                        }}
                        value={password2}
                    />
                </div>
                <div className='m-4 max-md:mx-0'>
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-amber-400 p-2'
                        onClick={register}
                    >
                        登入
                    </button>
                </div>
            </div>
        </>
    )
}

export default Register
