import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { IconChevronDown } from "@tabler/icons-react"
import * as Tabs from "@radix-ui/react-tabs"
import * as Select from "@radix-ui/react-select"
import { MenuItemType as OrderItem } from "@/types"
import URL from "@/url"
import Container from "@/components/Container"
// import SelectItem from "./components/SelectItem"

type OrderList = {
    orderID: string
    customerID: string
    status: string
    Bdate: string
    Details: OrderItem[]
}

type Order = {
    id: string
    list: OrderList[]
}

const Admin = () => {
    // useState data type Order
    const go = useNavigate()
    const [data, setData] = useState<Order[]>([])
    const [data1, setData1] = useState<OrderList[]>([])

    // const [items, setItems] = useState(["AA", "BB", "CC"])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL + "/order")
            let data = await response.json()
            // 根據 data status 來分類
            data = SortStatusIn(data)
            console.log("data: ", data)
            setData(data)
        }
        fetchData()
    }, [])

    const SortStatusIn = (data: OrderList[]) => {
        // 根據 data status 來分類
        const status = ["A", "B", "C"]
        const newStatus = ["todo", "doing", "done"]
        const newData: Order[] = []
        for (let i = 0; i < status.length; i++) {
            const statusList = []
            for (let j = 0; j < data.length; j++) {
                if (data[j].status === status[i]) {
                    statusList.push(data[j])
                }
            }
            newData.push({
                id: newStatus[i],
                list: statusList,
            })
        }
        return newData
    }

    // useEffect(() => {
    //     const postData = async () => {
    //         const arr = ["todo", "doing", "done"]
    //         for (let i = 0; i < arr.length; i++) {
    //             await fetch(URL + "/order/" + arr[i], {
    //                 method: "DELETE",
    //             })
    //         }

    //         for (let i = 0; i < data.length; i++) {
    //             await fetch(URL + "/order", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(data[i]), // data[0] = todo
    //             })
    //         }
    //     }
    //     if (data.length > 0) {
    //         postData()
    //     }
    // }, [data])

    useEffect(() => {
        console.log("data: ", data)
    }, [data])

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        console.log("source: ", source)
        console.log("destination: ", destination)

        if (!destination) {
            return
        }

        // 拷貝新的 items (來自 state)
        let newData = [...data]

        // 用 splice 處理拖曳後資料, 組合出新的 items
        // splice(start, deleteCount, item )
        // console.log("newItems: ", newItemObj)

        const sourceOrderList = newData.find((order) => order.id === source.droppableId)
        const destinationOrderList = newData.find((order) => order.id === destination.droppableId)

        if (sourceOrderList && destinationOrderList) {
            const [removedItem] = sourceOrderList.list.splice(source.index, 1)
            destinationOrderList.list.splice(destination.index, 0, removedItem)
        }

        // // 從source剪下被拖曳的元素
        // const [remove] = newItemObj[source.droppableId].items.splice(source.index, 1)

        // // 在destination位置貼上被拖曳的元素
        // newItemObj[destination.droppableId].items.splice(destination.index, 0, remove)
        // 設定新的 items
        setData(newData)
    }

    // 把分類todo, doing, done list 裡的訂單 status 分別修改對應 A, B, C

    const SortStatusOut = (data: Order[]) => {
        const status: { [key: string]: string } = { todo: "A", doing: "B", done: "C" }
        const newData: OrderList[] = []
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].list.length; j++) {
                data[i].list[j].status = status[data[i].id]
                newData.push(data[i].list[j])
            }
        }

        return newData
    }

    const SortStatusOut1 = (item: OrderList, itemStatus: string) => {
        // 把分類todo, doing, done list 裡的訂單 status 分別修改對應 A, B, C
        // SortStatusOut(data)
        const newData = SortStatusOut(data)
        // 迴圈newData找出要修改訂單 status 的那筆資料
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].orderID === item.orderID) {
                newData[i].status = itemStatus
                break
            }
        }
        setData1(newData)
    }

    const updateStatus = (mode: number) => {
        if (mode === 1) {
            const newData = SortStatusOut(data)
            console.log("更新後的資料: ", newData)
        } else if (mode === 2) {
            console.log("更新後的資料: ", data1)
        }
    }

    return (
        <Container>
            <div className='flex w-full flex-col'>
                <div className='flex h-96 w-full max-md:hidden'>
                    <DragDropContext
                        onBeforeCapture={(e) => console.log("onBeforeCapture: ", e)}
                        onBeforeDragStart={(e) => console.log("onBeforeDragStart: ", e)}
                        onDragStart={(e) => console.log("onDragStart: ", e)}
                        onDragUpdate={(e) => console.log("onDragUpdate: ", e)}
                        onDragEnd={onDragEnd}
                    >
                        <div className='w-full p-1'>
                            <div className='text-lg dark:text-white'>已付款</div>
                            <Droppable droppableId='todo'>
                                {(provided) => (
                                    <div className='h-full rounded-md bg-blue-200 p-2 dark:bg-blue-800'>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className='h-full'
                                        >
                                            {data[0]?.list.map((item: OrderList, i: number) => (
                                                <div key={item.orderID}>
                                                    <Draggable draggableId={item.orderID} index={i}>
                                                        {(provided) => (
                                                            <div
                                                                className='mb-2 rounded-md bg-white p-4 dark:bg-neutral-800 dark:text-white/60'
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                onClick={() => {
                                                                    go(`/details/${item.orderID}`)
                                                                }}
                                                            >
                                                                {item.orderID}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </div>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className='w-full p-1'>
                            <div className='text-lg dark:text-white'>處理中</div>
                            <Droppable droppableId='doing'>
                                {(provided) => (
                                    <div className='h-full rounded-md bg-orange-200 p-2 dark:bg-orange-800'>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className='h-full'
                                        >
                                            {data[1]?.list.map((item: OrderList, i: number) => (
                                                <div key={item.orderID}>
                                                    <Draggable draggableId={item.orderID} index={i}>
                                                        {(provided) => (
                                                            <div
                                                                className='mb-2 rounded-md bg-white p-4 dark:bg-neutral-800 dark:text-white/60'
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                onClick={() => {
                                                                    go(`/details/${item.orderID}`)
                                                                }}
                                                            >
                                                                {item.orderID}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </div>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                        <div className='w-full p-1'>
                            <div className='text-lg dark:text-white'>已完成</div>
                            <Droppable droppableId='done'>
                                {(provided) => (
                                    <div className='h-full rounded-md bg-green-200 p-2 dark:bg-green-800'>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className='h-full'
                                        >
                                            {data[2]?.list.map((item: OrderList, i: number) => (
                                                <div key={item.orderID}>
                                                    <Draggable draggableId={item.orderID} index={i}>
                                                        {(provided) => (
                                                            <div
                                                                className='mb-2 rounded-md bg-white p-4 dark:bg-neutral-800 dark:text-white/60'
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                onClick={() => {
                                                                    go(`/details/${item.orderID}`)
                                                                }}
                                                            >
                                                                {item.orderID}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                </div>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </DragDropContext>
                </div>
                <div className='hidden w-full max-md:block'>
                    <Tabs.Root
                        defaultValue='A'
                        className='w-full rounded-md bg-white p-4 shadow-md dark:bg-neutral-800 max-md:max-w-full max-md:dark:bg-transparent'
                    >
                        <Tabs.List className='flex w-full items-center justify-around border-b border-gray-300 py-2 dark:border-gray-700'>
                            <Tabs.Trigger value='A' asChild>
                                {/* [data-state] */}
                                <div className='text-lg data-[state=active]:border-b-2 data-[state=active]:border-amber-300 dark:text-white'>
                                    已付款
                                </div>
                            </Tabs.Trigger>
                            <Tabs.Trigger value='B' asChild>
                                <div className='text-lg data-[state=active]:border-b-2 data-[state=active]:border-amber-300 dark:text-white'>
                                    處理中
                                </div>
                            </Tabs.Trigger>
                            <Tabs.Trigger value='C' asChild>
                                <div className='text-lg data-[state=active]:border-b-2 data-[state=active]:border-amber-300 dark:text-white'>
                                    已完成
                                </div>
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value='A' className='p-2'>
                            {data[0]?.list.map((item: OrderList) => (
                                <div key={item.orderID}>
                                    <div className='mb-2 rounded-md bg-white p-4 shadow-md dark:bg-neutral-800 dark:text-white/60'>
                                        <div
                                            className='rounded-md bg-orange-400 p-1 font-mono hover:bg-orange-500 dark:bg-orange-800 dark:hover:bg-orange-700'
                                            onClick={() => {
                                                go(`/details/${item.orderID}`)
                                            }}
                                        >
                                            {item.orderID}
                                        </div>
                                        <div className='flex items-center justify-between max-md:flex-col'>
                                            <div className='flex items-center p-1'>
                                                <div className='text-xl'>狀態:</div>
                                                {/* <SelectItem
                                                    item={item}
                                                    SortStatusOut1={SortStatusOut1}
                                                /> */}
                                                <Select.Root
                                                    defaultValue={item.status}
                                                    required
                                                    onValueChange={(e) => {
                                                        SortStatusOut1(item, e)
                                                    }}
                                                >
                                                    <Select.Trigger className='flex rounded-md border border-gray-300 bg-white p-1 hover:border-gray-400 focus-visible:outline-none dark:border-gray-700 dark:bg-neutral-800 dark:text-white/60'>
                                                        <Select.Value />
                                                        <Select.Icon asChild>
                                                            <IconChevronDown />
                                                        </Select.Icon>
                                                    </Select.Trigger>
                                                    <Select.Portal>
                                                        <Select.Content
                                                            className='w-full min-w-[--radix-select-trigger-width] rounded-lg border border-gray-300 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-neutral-800 dark:text-white/60'
                                                            position='popper'
                                                            side='right'
                                                        >
                                                            <Select.ScrollUpButton />
                                                            <Select.Viewport>
                                                                <Select.Item
                                                                    value='A'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        已付款
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Item
                                                                    value='B'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        處理中
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Item
                                                                    value='C'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        已完成
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Separator />
                                                            </Select.Viewport>
                                                            <Select.ScrollDownButton />
                                                        </Select.Content>
                                                    </Select.Portal>
                                                </Select.Root>
                                            </div>
                                            <div className='text-xl'>
                                                {new Date(item.Bdate).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Tabs.Content>
                        <Tabs.Content value='B' className='p-2'>
                            {data[1]?.list.map((item: OrderList) => (
                                <div key={item.orderID}>
                                    <div className='mb-2 rounded-md bg-white p-4 shadow-md dark:bg-neutral-800 dark:text-white/60'>
                                        <div
                                            className='rounded-md bg-orange-400 p-1 font-mono hover:bg-orange-500 dark:bg-orange-800 dark:hover:bg-orange-700'
                                            onClick={() => {
                                                go(`/details/${item.orderID}`)
                                            }}
                                        >
                                            {item.orderID}
                                        </div>
                                        <div className='flex items-center justify-between max-md:flex-col'>
                                            <div className='flex items-center p-1'>
                                                <div className='text-xl'>狀態:</div>
                                                <Select.Root
                                                    defaultValue={item.status}
                                                    required
                                                    onValueChange={(e) => {
                                                        SortStatusOut1(item, e)
                                                    }}
                                                >
                                                    <Select.Trigger className='flex rounded-md border border-gray-300 bg-white p-1 hover:border-gray-400 focus-visible:outline-none dark:border-gray-700 dark:bg-neutral-800 dark:text-white/60'>
                                                        <Select.Value />
                                                        <Select.Icon asChild>
                                                            <IconChevronDown />
                                                        </Select.Icon>
                                                    </Select.Trigger>
                                                    <Select.Portal>
                                                        <Select.Content
                                                            className='w-full min-w-[--radix-select-trigger-width] rounded-lg border border-gray-300 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-neutral-800 dark:text-white/60'
                                                            position='popper'
                                                        >
                                                            <Select.ScrollUpButton />
                                                            <Select.Viewport>
                                                                <Select.Item
                                                                    value='A'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        已付款
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Item
                                                                    value='B'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        處理中
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Item
                                                                    value='C'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        已完成
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Separator />
                                                            </Select.Viewport>
                                                            <Select.ScrollDownButton />
                                                        </Select.Content>
                                                    </Select.Portal>
                                                </Select.Root>
                                            </div>
                                            <div className='text-xl'>
                                                {new Date(item.Bdate).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Tabs.Content>
                        <Tabs.Content value='C' className='p-2'>
                            {data[2]?.list.map((item: OrderList) => (
                                <div key={item.orderID}>
                                    <div className='mb-2 rounded-md bg-white p-4 shadow-md dark:bg-neutral-800 dark:text-white/60'>
                                        <div
                                            className='rounded-md bg-orange-400 p-1 font-mono hover:bg-orange-500 dark:bg-orange-800 dark:hover:bg-orange-700'
                                            onClick={() => {
                                                go(`/details/${item.orderID}`)
                                            }}
                                        >
                                            {item.orderID}
                                        </div>
                                        <div className='flex items-center justify-between max-md:flex-col'>
                                            <div className='flex items-center p-1'>
                                                <div className='text-xl'>狀態:</div>
                                                <Select.Root
                                                    defaultValue={item.status}
                                                    required
                                                    onValueChange={(e) => {
                                                        SortStatusOut1(item, e)
                                                    }}
                                                >
                                                    <Select.Trigger className='flex rounded-md border border-gray-300 bg-white p-1 hover:border-gray-400 focus-visible:outline-none dark:border-gray-700 dark:bg-neutral-800 dark:text-white/60'>
                                                        <Select.Value />
                                                        <Select.Icon asChild>
                                                            <IconChevronDown />
                                                        </Select.Icon>
                                                    </Select.Trigger>
                                                    <Select.Portal>
                                                        <Select.Content
                                                            className='w-full min-w-[--radix-select-trigger-width] rounded-lg border border-gray-300 bg-white p-1 shadow-md dark:border-gray-700 dark:bg-neutral-800 dark:text-white/60'
                                                            position='popper'
                                                        >
                                                            <Select.ScrollUpButton />
                                                            <Select.Viewport>
                                                                <Select.Item
                                                                    value='A'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        已付款
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Item
                                                                    value='B'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        處理中
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>
                                                                <Select.Item
                                                                    value='C'
                                                                    className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                                                                >
                                                                    <Select.ItemText>
                                                                        已完成
                                                                    </Select.ItemText>
                                                                    <Select.ItemIndicator />
                                                                </Select.Item>

                                                                <Select.Separator />
                                                            </Select.Viewport>
                                                            <Select.ScrollDownButton />
                                                        </Select.Content>
                                                    </Select.Portal>
                                                </Select.Root>
                                            </div>
                                            <div className='text-xl'>
                                                {new Date(item.Bdate).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Tabs.Content>
                    </Tabs.Root>
                    <div className='mt-2 hidden w-full max-md:block max-md:dark:px-6'>
                        <button
                            className='w-full rounded-lg bg-amber-300 p-4'
                            onClick={() => {
                                updateStatus(2)
                            }}
                        >
                            更新
                        </button>
                    </div>
                </div>
                <div className='mt-10 w-full max-md:hidden'>
                    <button
                        className='w-full rounded-lg bg-amber-300 p-4'
                        onClick={() => {
                            updateStatus(1)
                        }}
                    >
                        更新
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default Admin
