import { useState, useEffect } from "react"
import { IconUser, IconPhone, IconMail, IconX } from "@tabler/icons-react"
import * as Dialog from "@radix-ui/react-dialog"
import URL from "@/url"

const EditUser = ({ token }: { token: string }) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    // const [errorName, setErrorName] = useState(false)
    // const [errorPhone, setErrorPhone] = useState(false)

    useEffect(() => {
        // 打開寫入預設資料
        const fetchData = async () => {
            const res = await fetch(URL + "/info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerID: token,
                }),
            })
            const data = await res.json()
            setName(data.name)
            setEmail(data.email)
            setPhone(data.phone)
        }
        if (open) {
            fetchData()
            // setName("")
            // setEmail('')
            // setPhone("")
            // setErrorName(false)
            // setErrorPhone(false)
        }
    }, [open])

    useEffect(() => {
        // 最多只能四個字
        const isValiName = () => {
            return name.length <= 4
        }
        if (!isValiName()) {
            console.log(name.slice(0, 4))

            setName(name.slice(0, 4))
        }
    }, [name])

    // useEffect(() => {
    //     // 判斷台灣電話號碼是否正確()
    //     const isValiPhone = () => {
    //         const reg = /^09[0-9]{8}$/
    //         return reg.test(phone)
    //     }
    //     if (!isValiPhone()) {
    //         setErrorPhone(true)
    //     } else {
    //         setErrorPhone(false)
    //     }
    // }, [phone])

    return (
        <>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                    <button className='rounded-lg bg-amber-400 px-2 py-1 text-center hover:bg-amber-500 dark:text-neutral-900'>
                        編輯個人資料
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='fixed inset-0 bg-[rgba(0,0,0,.5)] backdrop-blur-sm data-[state=open]:animate-overlayShow' />
                    <Dialog.Content asChild>
                        <div className='fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4 shadow-lg focus:outline-none data-[state=open]:animate-contentShow dark:bg-neutral-900 dark:dark:text-white/60'>
                            <Dialog.Title asChild>
                                <div className='flex items-center justify-between'>
                                    <div className=''>編輯個人資料</div>
                                    <Dialog.Close>
                                        <IconX size={24} />
                                    </Dialog.Close>
                                </div>
                            </Dialog.Title>
                            <Dialog.Description asChild>
                                <div className=''>
                                    <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                                        <div className='flex w-1/3 items-center'>
                                            <IconUser size={24} />
                                            <div className='pl-2 text-2xl'>姓名</div>
                                        </div>
                                        <input
                                            type='text'
                                            className='box-border w-2/3 rounded-full px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:bg-neutral-800'
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                            value={name}
                                            placeholder='使用者名稱'
                                        />
                                    </div>
                                    <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                                        <div className='flex w-1/3 items-center'>
                                            <IconMail size={24} />
                                            <div className='pl-2 text-2xl'>Email</div>
                                        </div>
                                        <input
                                            type='email'
                                            className='box-border w-2/3 rounded-full px-2 py-1 focus-visible:outline-none'
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                            value={email}
                                            placeholder='電子郵件'
                                            disabled
                                        />
                                    </div>
                                    <div className=''>
                                        <div className='my-2 flex w-full items-center justify-between rounded-2xl p-2 hover:bg-gray-100 dark:hover:bg-neutral-800'>
                                            <div className='flex w-1/3 items-center'>
                                                <IconPhone size={24} />
                                                <div className='pl-2 text-2xl'>電話</div>
                                            </div>
                                            <input
                                                type='tel'
                                                className='box-border w-2/3 rounded-full px-2 py-1 focus-visible:outline-none'
                                                onChange={(e) => {
                                                    setPhone(e.target.value)
                                                }}
                                                value={phone}
                                                placeholder='電話'
                                                disabled
                                            />
                                        </div>
                                        {/* {errorPhone && (
                                            <div className='text-right text-red-500'>
                                                電話號碼格式錯誤
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            </Dialog.Description>
                            <button className='w-full rounded-lg bg-amber-400 px-2 py-1 text-center hover:bg-amber-500 dark:text-neutral-900'>
                                確認
                            </button>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default EditUser
