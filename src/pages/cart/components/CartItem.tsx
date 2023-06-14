import { MenuItemType } from "@/types"
import Order from "@/components/Order"

const MenuItem = ({ menuList, notify }: { menuList: MenuItemType[]; notify: () => void }) => {
    return (
        <>
            {menuList.map((item) => (
                <div
                    key={item.id}
                    className='cursor-pointer border-b-2 border-gray-200 p-1 dark:border-gray-700'
                    // onClick={() => {
                    //     go(`/menu/${item.id}`, {
                    //         state: { prevPath: "/cart" },
                    //     })
                    // }}
                >
                    <Order
                        menu={item}
                        notify={notify}
                        trigger={
                            <div className='flex w-full items-center justify-between rounded-2xl hover:bg-gray-100 dark:hover:bg-neutral-800 max-md:block'>
                                <div className='p-2'>
                                    <div className='flex max-md:justify-between'>
                                        <div className='max-md:order-2'>
                                            <img
                                                className='h-20 w-24 rounded-lg bg-cover object-cover'
                                                src={"/static/img/meals/" + item.cover + ".webp"}
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
                        }
                    />
                </div>
            ))}
        </>
    )
}

export default MenuItem
