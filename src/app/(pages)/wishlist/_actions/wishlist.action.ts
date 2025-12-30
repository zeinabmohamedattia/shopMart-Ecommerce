'use server'

import { getUserToken } from "@/app/Helpers/getUserToken"

export async function removeWishlistItemAction(productId: string) {
   const token= await getUserToken()
    const response = await fetch(`${process.env.API_URL}/wishlist/`+productId, {
        method: 'DELETE',
        headers: {
            token:token!
        }
    })
    const data = await response.json()
    return data
}
