import { useNavigate } from "react-router-dom"

type MenuItemProps = {
    id: number
    name: string
    price: number
    count: number
}

const MenuItem = ({ menuList }: { menuList: MenuItemProps[] }) => {
    const go = useNavigate()
    return (
        <>
            {menuList.map((item) => (
                <div key={item.id} className='cursor-pointer border-b-2 border-gray-200 p-1'>
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
                                        src={"https://picsum.photos/200/100?random=" + item.id}
                                        alt=''
                                    />
                                </div>
                                <div className='max-md:order-1'>
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
                        <div className='p-2 max-md:p-0 max-md:px-2 max-md:pb-2'>
                            <div className='grid grid-cols-2'>
                                <div className='p-2'>數量</div>
                                <div className='justify-self-end  p-2'>{item.count}</div>
                                <div className='p-2'>小計</div>
                                <div className='justify-self-end  p-2'>
                                    {item.price * item.count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MenuItem
