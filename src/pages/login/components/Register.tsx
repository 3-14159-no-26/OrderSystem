import { useState, useEffect } from "react"
import {
    IconPhone,
    IconMail,
    IconUser,
    IconUserCircle,
    IconLock,
    IconExclamationCircle,
} from "@tabler/icons-react"
import { v4 as uuidv4 } from "uuid"
import { ToastContainer, toast } from "react-toastify"
import clsx from "clsx"

const Register = ({ status }: { status: (status: string) => void }) => {
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorName, setErrorName] = useState(false)
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorPassword2, setErrorPassword2] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        const isValiPhone = () => {
            const reg = /^09[0-9]{8}$/
            return reg.test(phone)
        }
        if (!isValiPhone()) {
            console.log("請輸入有效的電話號碼")
            setErrorPhone(true)
        } else {
            console.log("phone is valid")
            setErrorPhone(false)
        }
    }, [phone])

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
        const isValiName = () => {
            return name.length <= 5
        }
        if (!isValiName()) {
            console.log("名字最多只能五個字")
            setErrorName(true)
        } else {
            console.log("name is valid")
            setErrorName(false)
        }
    }, [name])

    useEffect(() => {
        const isValiUsername = () => {
            // 必須是6-20位字符且要包含一個英文其他的都是數字能用 - _
            const re = /^(?=.*[a-zA-Z])[a-zA-Z\d_-]{4,20}$/
            return re.test(username)
        }
        if (!isValiUsername()) {
            console.log(
                "請輸入 4 到 20 個字符的字串，必須包含至少一個英文字母。允許使用數字、連字符和下劃線作為特殊字符。"
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
        if (
            errorPhone ||
            errorEmail ||
            errorName ||
            errorUsername ||
            errorPassword ||
            errorPassword2
        ) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }, [errorPhone, errorEmail, errorName, errorUsername, errorPassword, errorPassword2])

    useEffect(() => {
        setErrorPhone(false)
        setErrorEmail(false)
        setErrorName(false)
        setErrorUsername(false)
        setErrorPassword(false)
        setErrorPassword2(false)
    }, [])

    const register = async () => {
        if (
            errorPhone ||
            errorEmail ||
            errorName ||
            errorUsername ||
            errorPassword ||
            errorPassword2
        ) {
            return
        }
        if (
            phone === "" ||
            email === "" ||
            name === "" ||
            username === "" ||
            password === "" ||
            password2 === ""
        ) {
            return
        }
        console.log("register")
        try {
            const res = await fetch(`${URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerID: uuidv4(),
                    username: username,
                    userpwd: password,
                    email: email,
                    phone: phone,
                    // 目前台灣時間格式化 yyyy-mm-dd
                    Bdate: new Date().toLocaleString("zh-TW", {
                        timeZone: "Asia/Taipei",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }),
                }),
            })
            const data = await res.json()
            console.log(data)
            if (data.status === "success") {
                toast.success("註冊成功")
                status("login")
            } else {
                toast.error("註冊失敗")
            }
        } catch (error) {
            toast.error("註冊失敗")
        }
    }

    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
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
                        <IconPhone className='px-2' size={40} />
                        <input
                            type='tel'
                            className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                            value={phone}
                            placeholder='電話號碼'
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorPhone ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorPhone && (
                        <div className='text-right text-sm text-red-500'>請輸入有效的電話號碼</div>
                    )}
                </div>
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
                            "flex items-center rounded-full border bg-white p-1 text-xl max-md:mx-0",
                            errorName
                                ? "border-2 border-red-500"
                                : "border-gray-400 hover:border-gray-600"
                        )}
                    >
                        <IconUser className='px-2' size={40} />
                        <input
                            type='text'
                            className='box-border w-full rounded-r-full p-1 focus-visible:outline-none'
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            value={name}
                            placeholder='姓名'
                        />
                        <IconExclamationCircle
                            className={clsx("text-red-500", errorName ? "" : "hidden")}
                            size={40}
                            stroke={2}
                        />
                    </div>
                    {errorName && (
                        <div className='text-right text-sm text-red-500'>名字最多只能五個字</div>
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
                            請輸入 4 到 20
                            個字符的字串，必須包含至少一個英文字母。允許使用數字、連字符和下劃線作為特殊字符。
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
