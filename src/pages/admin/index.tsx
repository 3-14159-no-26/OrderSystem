import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import URL from "@/url"
import Container from "@/components/container"

const Admin = () => {
    const [data, setData] = useState([])
    const [items, setItems] = useState(["AA", "BB", "CC"])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL + "/order")
            const data = await response.json()
            setData(data)
            console.log(data)
        }
        fetchData()
    }, [])

    console.log("data: ", data)

    const onDragEnd = (event: { source: any; destination: any }) => {
        const { source, destination } = event
        console.log("source: ", source)

        if (!destination) {
            return
        }

        // 拷貝新的 items (來自 state)
        let newItems = [...items]

        // 用 splice 處理拖曳後資料, 組合出新的 items
        // splice(start, deleteCount, item )

        // 從 source.index 剪下被拖曳的元素
        const [remove] = newItems.splice(source.index, 1)

        //在 destination.index 位置貼上被拖曳的元素
        newItems.splice(destination.index, 0, remove)

        // 設定新的 items
        setItems(newItems)
    }
    return (
        <Container>
            <DragDropContext
                onBeforeCapture={(e) => console.log("onBeforeCapture: ", e)}
                onBeforeDragStart={(e) => console.log("onBeforeDragStart: ", e)}
                onDragStart={(e) => console.log("onDragStart: ", e)}
                onDragUpdate={(e) => console.log("onDragUpdate: ", e)}
                onDragEnd={(e) => onDragEnd(e)}
            >
                <h1>Todo</h1>
                <Droppable droppableId='drop-id'>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {items.map((item, i) => (
                                <div key={item}>
                                    <Draggable draggableId={item} index={i}>
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            >
                                                {item}
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Container>
    )
}

export default Admin

// {order.map((item: any) => (
//     <div key={item.id}>
//         <p>ID: {item.id}</p>
//         <p>Name: {item.name}</p>
//         <p>Category: {item.category}</p>
//         <p>Price: {item.price}</p>
//         <p>Count: {item.count}</p>
//     </div>
// ))}
