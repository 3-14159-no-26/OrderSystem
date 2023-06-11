import { useState, createContext, useContext, useEffect } from "react"
import { MenuType, MenuItemType } from "@/types"

type MenuListType = MenuItemType[]

const defaultValue: {
    menuList: MenuListType
    addToCart: (item: MenuType, count: number) => void
    resetToCart: () => void
} = {
    menuList: [],
    addToCart: () => 0,
    resetToCart: () => 0,
}

const MenuListContext = createContext(defaultValue)

const MenuListProvider = ({ children }: { children: React.ReactNode }) => {
    const [menuList, setMenuList] = useState<MenuListType>([])

    // 從本地儲存中讀取 menuList 的值
    useEffect(() => {
        const menuList = localStorage.getItem("menuList")
        if (menuList && JSON.parse(menuList).length !== 0) {
            console.log("從本地儲存中讀取 menuList 的值", JSON.parse(menuList))
            setMenuList(JSON.parse(menuList))
        }
    }, [])

    // 將 menuList 的值存到本地儲存
    useEffect(() => {
        localStorage.setItem("menuList", JSON.stringify(menuList))
    }, [menuList])

    // 將 menuList 的值清空
    useEffect(() => {
        if (menuList.length === 0) {
            localStorage.removeItem("menuList")
        }
    }, [menuList])

    const addToCart = (item: MenuType, count: number) => {
        // console.log("click addToCart", item)
        // 如果陣列裡面有此物件，就把數量修改
        const index = menuList.findIndex((e) => e.id == item.id)
        if (index !== -1) {
            const newMenuList = [...menuList]
            newMenuList[index].count = count
            setMenuList(newMenuList)
            // console.log("click addToCart", menuList)
        }
        // 如果陣列裡面沒有此物件，就把物件加進去
        else {
            setMenuList([...menuList, { ...item, count }])
            // console.log("click addToCart", menuList)
        }
    }

    const resetToCart = () => {
        setMenuList([])
    }

    return (
        <MenuListContext.Provider value={{ menuList, addToCart, resetToCart }}>
            {children}
        </MenuListContext.Provider>
    )
}

const useMenuListContext = () => {
    return useContext(MenuListContext)
}

export { MenuListProvider, useMenuListContext }
