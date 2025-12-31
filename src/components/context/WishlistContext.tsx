'use client'
import { WishlistResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishlistContext = createContext<{
    wishlistData: WishlistResponse | null,
    setWishlistData: (value: WishlistResponse | null) => void,
    isWishlistLoading: boolean,
    setIsWishlistLoading: (value: boolean) => void,
    getWishlist:()=>void
}>({
    wishlistData: null,
    setWishlistData: () => { },
    isWishlistLoading: false,
    setIsWishlistLoading: () => { },
    getWishlist:()=>{}
})
export default function WishlistContextProvider({ children }: { children: ReactNode }) {
    const [wishlistData, setWishlistData] = useState<WishlistResponse|null>(null)
    const [isWishlistLoading, setIsWishlistLoading] = useState(false)
    async function getWishlist() {
        setIsWishlistLoading(true)
       const response= await fetch('/api/get-wishlist')
        const data: WishlistResponse = await response.json()
        setWishlistData(data) //////
        setIsWishlistLoading(false)
    }
    useEffect(() => {
        getWishlist()
    }, [])
    return <WishlistContext.Provider value={{wishlistData,setWishlistData,isWishlistLoading,setIsWishlistLoading,getWishlist}}>
        {children}
    </WishlistContext.Provider>
} 