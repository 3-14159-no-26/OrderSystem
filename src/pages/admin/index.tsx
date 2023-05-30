import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import URL from "@/url"
import Container from "@/components/container"

type OrderItem = {
    id: number
    name: string
    category: string
    price: number
    count: number
}

type OrderList = {
    id: string
    list: OrderItem[]
}

type Order = {
    id: string
    list: OrderList[]
}

const Admin = () => {
    // useState data type Order
    const [data, setData] = useState<Order[]>([])

    // const [items, setItems] = useState(["AA", "BB", "CC"])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL + "/order")
            const data = await response.json()
            setData(data)
            console.log("data: ", data)
            console.log("todo: ", data[0].list)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const postData = async () => {
            const arr = ["todo", "doing", "done"]
            for (let i = 0; i < arr.length; i++) {
                await fetch(URL + "/order/" + arr[i], {
                    method: "DELETE",
                })
            }

            for (let i = 0; i < data.length; i++) {
                await fetch(URL + "/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data[i]), // data[0] = todo
                })
            }
        }
        if (data.length > 0) {
            postData()
        }
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
    return (
        <Container>
            <div className='flex h-96 w-full'>
                <DragDropContext
                    onBeforeCapture={(e) => console.log("onBeforeCapture: ", e)}
                    onBeforeDragStart={(e) => console.log("onBeforeDragStart: ", e)}
                    onDragStart={(e) => console.log("onDragStart: ", e)}
                    onDragUpdate={(e) => console.log("onDragUpdate: ", e)}
                    onDragEnd={onDragEnd}
                >
                    <div className='w-full'>
                        <div className='text-lg'>未處理</div>
                        <Droppable droppableId='todo'>
                            {(provided) => (
                                <div className='h-full bg-orange-200 p-2'>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='h-full'
                                    >
                                        {data[0]?.list.map((item: OrderList, i: number) => (
                                            <div key={item.id}>
                                                <Draggable draggableId={item.id} index={i}>
                                                    {(provided) => (
                                                        <div
                                                            className='mb-2 bg-white p-4'
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            {item.id}
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
                    <div className='h-full w-full'>
                        <div className='text-lg'>處理中</div>
                        <Droppable droppableId='doing'>
                            {(provided) => (
                                <div className='h-full bg-green-200 p-2'>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='h-full'
                                    >
                                        {data[1]?.list.map((item: OrderList, i: number) => (
                                            <div key={item.id}>
                                                <Draggable draggableId={item.id} index={i}>
                                                    {(provided) => (
                                                        <div
                                                            className='mb-2 bg-white p-4'
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            {item.id}
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
                    <div className='w-full'>
                        <div className='text-lg'>已完成</div>
                        <Droppable droppableId='done'>
                            {(provided) => (
                                <div className='h-full bg-blue-200 p-2'>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='h-full'
                                    >
                                        {data[2]?.list.map((item: OrderList, i: number) => (
                                            <div key={item.id}>
                                                <Draggable draggableId={item.id} index={i}>
                                                    {(provided) => (
                                                        <div
                                                            className='mb-2 bg-white p-4'
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                        >
                                                            {item.id}
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
        </Container>
    )
}

export default Admin
