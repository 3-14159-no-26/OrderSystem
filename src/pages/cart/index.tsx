import { useNavigate } from "react-router-dom"
import { useMenuListContext } from "@/context/MenuList"
import Container from "@/components/container"

const Cart = () => {
    const go = useNavigate()
    const { menuList, resetToCart } = useMenuListContext()
    return (
        <>
            <Container>
                <div className='w-full rounded-2xl border-2 border-black bg-[#efa987]'>
                    <div className='relative z-10 m-[-2px] h-40 border-collapse rounded-2xl border-2 border-black px-4 pb-4 shadow-xl'>
                        <div className='flex h-full w-full items-center justify-center rounded-b-xl border-x-2 border-b-2 border-dashed border-[#ae7252]'>
                            <div className=''>
                                <div className='m-2 flex items-center justify-center'>
                                    <div className='text-3xl'>WH Eats 帳單本</div>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <div className='rounded-full border-2 border-dashed border-black bg-[#fbc3a5] px-4 py-1'>
                                        記得要結帳喔~
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-4 pb-4'>
                        <div className='rounded-b-xl border-x-2 border-b-2 border-dashed border-[#ae7252] px-4 pb-4'>
                            <div className='relative'>
                                <div className='details-list '>
                                    <div className='w-full bg-white p-4'>
                                        {/* 如果 menuList 是空的就顯示 尚未加入購物車, 否則就顯示總計 */}
                                        {menuList.length !== 0 ? (
                                            <>
                                                <div className='flex items-center justify-center p-4'>
                                                    <div className='text-3xl'>單號:087</div>
                                                </div>
                                                <div className='flex items-center justify-center px-4 pb-4'>
                                                    <div className='text-2xl'>時間 2023/09/87</div>
                                                </div>
                                                {menuList.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className='cursor-pointer border-b-2 border-gray-200 p-1'
                                                    >
                                                        <div
                                                            className='flex w-full items-center justify-between rounded-2xl hover:bg-gray-100 max-md:block'
                                                            onClick={() => {
                                                                go(`/menu/${item.id}`, {
                                                                    state: { prevPath: "/cart" },
                                                                })
                                                            }}
                                                        >
                                                            <div className='p-2'>
                                                                <div className='flex max-md:justify-between'>
                                                                    <div className='max-md:order-2'>
                                                                        <img
                                                                            className='h-20 w-20 rounded-lg object-cover'
                                                                            src={
                                                                                "https://picsum.photos/200/100?random=" +
                                                                                item.id
                                                                            }
                                                                            alt=''
                                                                        />
                                                                    </div>
                                                                    <div className='max-md:order-1'>
                                                                        <div className='flex'>
                                                                            <div className='p-2'>
                                                                                品名
                                                                            </div>
                                                                            <div className='p-2'>
                                                                                {item.name}
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex'>
                                                                            <div className='p-2'>
                                                                                單價
                                                                            </div>
                                                                            <div className='p-2'>
                                                                                {item.price}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='p-2 max-md:p-0 max-md:px-2 max-md:pb-2'>
                                                                <div className='grid grid-cols-2'>
                                                                    <div className='p-2'>數量</div>
                                                                    <div className='justify-self-end  p-2'>
                                                                        {item.count}
                                                                    </div>
                                                                    <div className='p-2'>小計</div>
                                                                    <div className='justify-self-end  p-2'>
                                                                        {item.price * item.count}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className='border-b-2 border-gray-200'>
                                                    <div className='flex justify-between text-2xl'>
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
                                                                return (
                                                                    total + item.price * item.count
                                                                )
                                                            }, 0)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className='border-b-2 border-gray-200'>
                                                <div className='flex justify-center text-2xl'>
                                                    <div className='p-2'>尚未加入購物車</div>
                                                </div>
                                            </div>
                                        )}
                                        <div className='mt-4 flex'>
                                            <button
                                                className='m-1 w-full rounded-lg bg-amber-400 p-2'
                                                onClick={() => resetToCart()}
                                            >
                                                清空購物車
                                            </button>
                                            <button className='m-1 w-full rounded-lg bg-amber-400 p-2'>
                                                結帳
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart
