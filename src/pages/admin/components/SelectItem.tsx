import * as Select from "@radix-ui/react-select"
import { IconChevronDown } from "@tabler/icons-react"
import { MenuItemType as OrderItem } from "@/types"

type OrderList = {
    orderID: string
    customerID: string
    status: string
    Bdate: string
    Details: OrderItem[]
}

const SelectItem = ({
    item,
    SortStatusOut1,
}: {
    item: OrderList
    SortStatusOut1: (item: OrderList, e: string) => void
}) => {
    return (
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
                            <Select.ItemText>已付款</Select.ItemText>
                            <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Item
                            value='B'
                            className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                        >
                            <Select.ItemText>處理中</Select.ItemText>
                            <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Item
                            value='C'
                            className='cursor-pointer rounded-md p-1 outline-none hover:bg-gray-200 hover:outline-none dark:hover:bg-neutral-700'
                        >
                            <Select.ItemText>已完成</Select.ItemText>
                            <Select.ItemIndicator />
                        </Select.Item>
                        <Select.Separator />
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}

export default SelectItem
