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
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorPassword2, setErrorPassword2] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        const isValiEmail = () => {
            const re = /\S+@\S+\.\S+/
            return re.test(email)
        }
        if (!isValiEmail()) {
            console.log("請輸入有效的電子郵件")
            setErrorEmail(true)
        } else {
            console.log("email is valid")
            setErrorEmail(false)
        }
    }, [email])

    useEffect(() => {
        const isValiUsername = () => {
            // 必須是6-20位字符且要包含一個英文其他的都是數字能用 - _
            const re = /^(?=.*[a-zA-Z])[a-zA-Z\d_-]{6,20}$/
            return re.test(username)
        }
        if (!isValiUsername()) {
            console.log(
                "請輸入 6 到 20 個字符的字串，必須包含至少一個英文字母。允許使用數字、連字符和下劃線作為特殊字符。"
            )
            setErrorUsername(true)
        } else {
            console.log("username is valid")
            setErrorUsername(false)
        }
    }, [username])

    useEffect(() => {
        const isValiPassword = () => {
            // 必須是6-20位字符且要包含一個英文其他的都是數字
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
        if (errorEmail || errorUsername || errorPassword || errorPassword2) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [errorEmail, errorUsername, errorPassword, errorPassword2])

    useEffect(() => {
        setErrorEmail(false)
        setErrorUsername(false)
        setErrorPassword(false)
        setErrorPassword2(false)
    }, [])

    const register = () => {
        if (errorEmail || errorUsername || errorPassword || errorPassword2) {
            return
        }
        if (email === "" || username === "" || password === "" || password2 === "") {
            return
        }
        console.log("register")
    }

    return (
        <>
            <div className='m-2 flex flex-col items-center justify-center rounded-lg bg-white p-2 shadow'>
                <div className='p-2 text-xl font-semibold'>歡迎使用！線上點餐系統</div>
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
                            placeholder='電子郵件'
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorEmail ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorEmail && (
                        <div className='text-right text-sm text-red-500'>請輸入有效的電子郵件</div>
                    )}
                </div>
                <div className='m-4'>
                    <div
                        className={clsx(
                            "flex items-center rounded-full border bg-white p-1 text-xl",
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
                            placeholder='使用者名稱'
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorUsername ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorUsername && (
                        <div className='text-right text-sm text-red-500'>
                            包含至少一個字母和一個數字，且只能由字母和數字組成，長度介於 6 到 20
                            個字符之間。
                        </div>
                    )}
                </div>
                <div className='m-4'>
                    <div
                        className={clsx(
                            "flex items-center rounded-full border bg-white p-1 text-xl max-md:mx-0",
                            errorPassword
                                ? "border-2 border-red-500"
                                : "border-gray-400 hover:border-gray-600"
                        )}
                    >
                        <IconLock className='px-2' size={40} />
                        <input
                            type='password'
                            className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            placeholder='密碼'
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorPassword ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorPassword && (
                        <div className='text-right text-sm text-red-500'>
                            包含至少一個字母和一個數字，且只能由字母和數字組成，長度介於 6 到 20
                            個字符之間。
                        </div>
                    )}
                </div>
                <div className='m-4'>
                    <div
                        className={clsx(
                            "flex items-center rounded-full border bg-white p-1 text-xl max-md:mx-0",
                            errorPassword2
                                ? "border-2 border-red-500"
                                : "border-gray-400 hover:border-gray-600"
                        )}
                    >
                        <IconLock className='px-2' size={40} />
                        <input
                            type='password'
                            className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                            onChange={(e) => {
                                setPassword2(e.target.value)
                            }}
                            value={password2}
                            placeholder='確認密碼'
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorPassword2 ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorPassword2 && (
                        <div className='text-right text-sm text-red-500'>兩次輸入的密碼不一致</div>
                    )}
                </div>
                <div className='m-4 max-md:mx-0'>
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-amber-400 p-2 disabled:cursor-not-allowed disabled:opacity-50'
                        onClick={register}
                        disabled={buttonDisabled}
                    >
                        註冊
                    </button>
                </div>
            </div>
            <div className='hidden'>
                {errorPassword}
                {errorPassword2}
            </div>
        </>
    )
}

export default Register
