import { useMenuListContext } from "@/context/MenuList"
import Container from "@/components/container"

const Cart = () => {
    const { menuList, resetToCart } = useMenuListContext()
    return (
        <>
            <Container>
                <div className='w-full'>
                    <div>Cart</div>
                    {menuList.map((item) => (
                        <div
                            key={item.id}
                            className='flex flex-row justify-between border-b-2 border-gray-200'
                        >
                            <div className='p-2'>
                                <div className='flex'>
                                    <img
                                        className='w-20 h-20 object-cover rounded-lg'
                                        src={"https://picsum.photos/200/100?random=" + item.id}
                                        alt=''
                                    />
                                    <div className=''>
                                        <div className='flex'>
                                            <div className='p-2'>品名</div>
                                            <div className='p-2'>{item.name}</div>
                                        </div>
                                        <div className='flex'>
                                            <div className='p-2'>單價</div>
                                            <div className='p-2'>{item.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-2'>
                                <div className='grid grid-cols-2'>
                                    <div className='p-2'>數量</div>
                                    <div className='p-2  justify-self-end'>{item.count}</div>
                                    <div className='p-2'>小計</div>
                                    <div className='p-2  justify-self-end'>
                                        {item.price * item.count}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='border-b-2 border-gray-200'>
                        <div className='flex justify-between'>
                            <div className='p-2'>總計</div>
                            <div className='p-2'>
                                {menuList.reduce((total, item) => {
                                    console.log(
                                        "目前加總",
                                        total,
                                        "目前項目 =>",
                                        "單價",
                                        item.price,
                                        "數量",
                                        item.count
                                    )

                                    return total + item.price * item.count
                                }, 0)}
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-4'>
                        <button
                            className='bg-amber-400 p-2 rounded-lg w-full m-1'
                            onClick={() => resetToCart()}
                        >
                            清空購物車
                        </button>
                        <button className='bg-amber-400 p-2 rounded-lg w-full m-1'>結帳</button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart
