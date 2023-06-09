import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { ToastContainer, toast, ToastContentProps } from "react-toastify"
import { IconLoader2 } from "@tabler/icons-react"
import { MenuItemType } from "@/types"
import Cookies from "js-cookie"
import clsx from "clsx"
import URL from "@/url"
import Container from "@/components/Container"
// import MenuItem from "@/pages/cart/components/CartItem"

// "message": {
//     "orderID": "471e5ef6-7712-4c1f-9177-6198abfa8676",
//     "customerID": "c400bfb6-b476-46de-8d1b-20108121f8bf",
//     "status": "A",
//     "Bdate": "2023-06-13T15:48:16",
//     "Details": [
//         {
//             "detailID": "cdd1ccfe-5959-49bc-8784-266b0966305d",
//             "orderID": "471e5ef6-7712-4c1f-9177-6198abfa8676",
//             "dishID": 2.0,
//             "dishCount": 1.0
//         }
//     ]
// }

type DetailsItemType = {
    orderID: string
    customerID: string
    status: string
    Bdate: string
    Details: MenuItemType[]
}

// const detailsOneData: DetailsItemType = {
//     orderID: "485b33f0-1895-482f-ba61-0759687f7655",
//     customerID: "c400bfb6-b476-46de-8d1b-20108121f8bf",
//     status: "B",
//     Bdate: "2023-06-13T15:48:16",
//     Details: [
//         {
//             id: 1,
//             cover: "嫩煎鷄腿堡",
//             name: "嫩煎鷄腿堡",
//             category: "MM",
//             price: 80.0,
//             count: 4.0,
//         },
//         {
//             id: 2,
//             cover: "大麥克",
//             name: "大麥克",
//             category: "MM",
//             price: 75.0,
//             count: 3.0,
//         },
//     ],
// }

// const detailsAllData: DetailsItemType[] = [
//     {
//         orderID: "471e5ef6-7712-4c1f-9177-6198abfa8676",
//         customerID: "c400bfb6-b476-46de-8d1b-20108121f8bf",
//         status: "A",
//         Bdate: "2023-06-13T15:48:16",
//         Details: [
//             {
//                 id: 1,
//                 cover: "嫩煎鷄腿堡",
//                 name: "嫩煎鷄腿堡",
//                 category: "MM",
//                 price: 80.0,
//                 count: 4.0,
//             },
//         ],
//     },
//     {
//         orderID: "485b33f0-1895-482f-ba61-0759687f7655",
//         customerID: "c400bfb6-b476-46de-8d1b-20108121f8bf",
//         status: "B",
//         Bdate: "2023-06-13T17:40:19",
//         Details: [
//             {
//                 id: 1,
//                 cover: "大麥克",
//                 name: "大麥克",
//                 category: "MM",
//                 price: 75.0,
//                 count: 3.0,
//             },
//             {
//                 id: 2,
//                 cover: "嫩煎鷄腿堡",
//                 name: "嫩煎鷄腿堡",
//                 category: "MM",
//                 price: 80.0,
//                 count: 4.0,
//             },
//         ],
//     },
// ]

const Details = () => {
    const { id } = useParams()
    const location = useLocation()
    const go = useNavigate()
    const [OneData, setOneData] = useState<DetailsItemType | null>(null)
    const [AllData, setAllData] = useState<DetailsItemType[] | null>(null)
    const [OneDataLoading, setOneDataLoading] = useState(false)
    const [AllDataLoading, setAllDataLoading] = useState(false)
    const orderStatus: { [key: string]: string } = {
        A: "已付款",
        B: "處理中",
        C: "已完成",
    }

    let orderStatusColor: { [key: string]: string } = {
        A: "bg-blue-600",
        B: "bg-yellow-600",
        C: "bg-green-600",
    }

    useEffect(() => {
        const fetchOneData = async () => {
            setOneDataLoading(true)
            // const token = Cookies.get("token")
            // const res = await fetch(`${URL}/details`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         customerID: token,
            //         orderID: id,
            //     }),
            // })
            // const resData = await res.json()
            // setOneData(responseData.message)
            // setOneData(detailsOneData)
            // setOneDataLoading(false)
            const token = Cookies.get("token")
            const fetchData = fetch(`${URL}/details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerID: token,
                    orderID: id,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error(`請求失敗${res.status}`)
                    }
                })
                .then((data) => {
                    if (data.message === "查無此訂單") {
                        throw new Error(`查無此訂單`)
                    } else {
                        setOneData(data.message)
                    }
                    // setOneData(detailsOneData)
                    setOneDataLoading(false)
                })
                .catch((err) => {
                    throw err
                })

            toast.promise(fetchData, {
                pending: "資料載入中...",
                success: "資料載入成功",
                // 顯示完成跳轉頁面
                error: {
                    render({ data }: ToastContentProps<{ message: string }>) {
                        return (
                            <div>
                                資料載入失敗
                                <div>{data?.message}</div>
                            </div>
                        )
                    },
                },
            })
        }

        const fetchAllData = async () => {
            setAllDataLoading(true)
            // let status = "AB"
            // if (location.state?.orderStatus === "C") {
            //     status = "C"
            // }
            // const token = Cookies.get("token")
            // const res = await fetch(`${URL}/details`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         customerID: token,
            //         status: status,
            //     }),
            // })
            // const resData = await res.json()
            // setAllData(responseData.message)
            // setAllData(detailsAllData)
            // setAllDataLoading(false)
            let status = "AB"
            if (location.state?.orderStatus === "C") {
                status = "C"
            }
            const token = Cookies.get("token")
            const fetchData = fetch(`${URL}/details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerID: token,
                    status: status,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error(`請求失敗${res.status}`)
                    }
                })
                .then((data) => {
                    if (data.status === "fail") {
                        if (data.message === "查無此訂單") {
                            throw new Error(`查無此訂單`)
                        } else {
                            setAllData([])
                        }
                    } else {
                        setAllData(data.message)
                    }
                    // setAllData(detailsAllData)
                    setAllDataLoading(false)
                })
                .catch((err) => {
                    throw err
                })

            toast.promise(fetchData, {
                pending: "資料載入中...",
                success: "資料載入成功",
                error: {
                    render({ data }: ToastContentProps<{ message: string }>) {
                        return (
                            <div>
                                資料載入失敗
                                <div>{data?.message}</div>
                            </div>
                        )
                    },
                },
            })
        }

        if (id) {
            fetchOneData()
        } else {
            fetchAllData()
        }
    }, [])

    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <Container>
                <div className='w-full p-2'>
                    {OneDataLoading && (
                        <>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='h-28 w-28 rounded-full bg-slate-200'></div>
                            </div>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='h-20 w-20 rounded-full bg-slate-50'></div>
                            </div>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                {/* <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900'></div> */}
                                <IconLoader2 className='h-32 w-32 animate-spin text-gray-900' />
                            </div>
                        </>
                    )}
                    {OneData && (
                        <div className='rounded-md bg-white p-2 shadow-md dark:bg-neutral-900 dark:text-white/60'>
                            <div className='mb-4 rounded-md border border-dashed border-gray-500 p-1'>
                                <div className='py-2'>
                                    <div className='text-center text-lg'>訂單編號</div>
                                    <div className='flex justify-center'>
                                        <div className='rounded-md bg-orange-400 px-1 font-mono dark:bg-orange-800'>
                                            {OneData.orderID}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end max-md:block max-md:text-center'>
                                    <div className='grid grid-flow-row grid-cols-3 place-items-center justify-items-end max-md:justify-items-center'>
                                        <div>訂單日期：</div>
                                        {/* 時間格式化輸出 */}
                                        <div className='col-span-2'>
                                            {new Date(OneData.Bdate).toLocaleString()}
                                        </div>
                                        <div>訂單狀態：</div>
                                        <div
                                            className={clsx(
                                                "col-span-2 rounded-md p-1 text-white",
                                                orderStatusColor[OneData.status]
                                            )}
                                        >
                                            {orderStatus[OneData.status]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>訂單明細：</div>
                            {OneData.Details.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between border-t'
                                >
                                    <div className=''>
                                        <div>餐點名稱：{item.name}</div>
                                        <div>餐點價格：{item.price}</div>
                                        <div>餐點數量：{item.count}</div>
                                    </div>
                                    <div className=''>
                                        <img
                                            src={"/static/img/meals/" + item.cover + ".webp"}
                                            alt=''
                                            className='h-20 w-20 object-cover'
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {AllDataLoading && (
                        // absolute 置中
                        <>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='h-28 w-28 rounded-full bg-slate-200'></div>
                            </div>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <div className='h-20 w-20 rounded-full bg-slate-50'></div>
                            </div>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                {/* <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900'></div> */}
                                <IconLoader2 className='h-32 w-32 animate-spin text-gray-900' />
                            </div>
                        </>
                    )}
                    {/* 如果是空值就顯示沒有訂單 */}
                    {AllData && AllData.length === 0 && (
                        <div className='rounded-md bg-white p-2 shadow-md dark:bg-neutral-900 dark:text-white/60'>
                            <div className='text-center'>沒有訂單</div>
                        </div>
                    )}

                    {AllData && AllData.length > 0 && (
                        <div>
                            {AllData.map((item, index) => (
                                <div
                                    key={index}
                                    className='relative mb-2 cursor-pointer rounded-md bg-white p-4 shadow-md hover:bg-gray-100 hover:shadow-lg dark:bg-neutral-900 dark:text-white/60 dark:hover:bg-neutral-800'
                                    onClick={() => go(`/details/${item.orderID}`)}
                                >
                                    <div>訂單日期：{new Date(item.Bdate).toLocaleString()}</div>
                                    <div className='flex font-mono'>
                                        <div className='rounded-md bg-orange-400 px-1 dark:bg-orange-800'>
                                            {item.orderID}
                                        </div>
                                    </div>
                                    {/* <div className='absolute right-0 top-0 rounded-bl-md rounded-tr-md bg-blue-500 p-1 text-white'> */}
                                    <div
                                        className={clsx(
                                            "absolute right-0 top-0 rounded-bl-md rounded-tr-md p-1 text-white",
                                            orderStatusColor[item.status]
                                        )}
                                    >
                                        {orderStatus[item.status]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}

export default Details
