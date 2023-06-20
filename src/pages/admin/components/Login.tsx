import { useState, useEffect } from "react"
import { IconUserCircle, IconLock, IconExclamationCircle } from "@tabler/icons-react"
import Cookies from "js-cookie"
import clsx from "clsx"
import URL from "@/url"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    useEffect(() => {
        if (username.length > 0) {
            setErrorUsername(false)
        } else {
            setErrorUsername(true)
        }
    }, [username])

    useEffect(() => {
        if (password.length > 0) {
            setErrorPassword(false)
        } else {
            setErrorPassword(true)
        }
    }, [password])

    useEffect(() => {
        setErrorUsername(false)
        setErrorPassword(false)
    }, [])

    const login = async () => {
        if (username.length > 0 && password.length > 0) {
            console.log("login")
            const res = await fetch(URL + "/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    userpwd: password,
                }),
            })
            const data = await res.json()
            console.log(data)
            if (data.status === "success") {
                // 登入成功
                // 1. 設定 cookie
                Cookies.set("token", data.token)
                // 2. 跳轉頁面
                window.location.href = "/admin"
                // 3. 關閉登入視窗
            }
        } else {
            if (username.length === 0) {
                setErrorUsername(true)
            }
            if (password.length === 0) {
                setErrorPassword(true)
            }
        }
    }

    return (
        <>
            <div className='relative h-[91.7vh] w-full'>
                <div className='absolute left-0 top-0 h-full w-full bg-slate-50 dark:bg-[#0f0f0f]'>
                    <div className='flex h-full w-full flex-grow flex-col items-center justify-center'>
                        <div className='w-96 rounded-xl bg-slate-300 p-4 shadow dark:bg-neutral-800 max-md:max-w-full max-md:bg-transparent max-md:shadow-none max-md:dark:bg-transparent'>
                            <div className='w-full text-center text-xl dark:text-white'>
                                管理者登入
                            </div>
                            <div className='m-4'>
                                <div
                                    className={clsx(
                                        "flex items-center rounded-full border border-gray-400 bg-white px-1 text-xl hover:border-gray-600",
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
                                        placeholder='使用者名稱'
                                    />
                                    <IconExclamationCircle
                                        className={clsx(
                                            "text-red-500",
                                            errorUsername ? "" : "hidden"
                                        )}
                                        size={40}
                                        stroke={2}
                                    />
                                </div>
                                {errorUsername && (
                                    <div className='text-right text-sm text-red-500'>
                                        請輸入正確的帳號
                                    </div>
                                )}
                            </div>
                            <div className='m-4'>
                                <div
                                    className={clsx(
                                        "flex items-center rounded-full border border-gray-400 bg-white px-1 text-xl",
                                        errorPassword
                                            ? "border-2 border-red-500"
                                            : "border-gray-400"
                                    )}
                                >
                                    <IconLock className='px-2' size={40} />
                                    <input
                                        type='password'
                                        className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        placeholder='使用者密碼'
                                    />
                                    <IconExclamationCircle
                                        className={clsx(
                                            "text-red-500",
                                            errorPassword ? "" : "hidden"
                                        )}
                                        size={40}
                                        stroke={2}
                                    />
                                </div>
                                {errorPassword && (
                                    <div className='text-right text-sm text-red-500'>
                                        請輸入正確的密碼
                                    </div>
                                )}
                            </div>
                            <div className='m-4'>
                                <button
                                    type='submit'
                                    className='w-full rounded-lg bg-amber-400 p-2'
                                    onClick={login}
                                >
                                    登入
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
