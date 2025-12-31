'use client'
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getCart:()=>void
}>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart:()=>{}
})
export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartResponse|null>(null)
    const [isLoading, setIsLoading] = useState(false)
    async function getCart() {
        setIsLoading(true)
       const response= await fetch('/api/get-cart')
        const data: CartResponse = await response.json()
        setCartData(data) //////
        setIsLoading(false)
    }
    useEffect(() => {
        getCart()
    }, [])
    return <CartContext.Provider value={{cartData,setCartData,isLoading,setIsLoading,getCart}}>
        {children}
    </CartContext.Provider>
} 