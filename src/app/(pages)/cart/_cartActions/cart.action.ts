'use server'

import { getUserToken } from "@/app/Helpers/getUserToken"
import { CartResponse } from "@/interfaces"

export async function removeCartItemAction(productId: string) {
   const token= await getUserToken()
    const response = await fetch(`${process.env.API_URL}/cart/` + productId, {
        method: 'DELETE',
        headers: {
            token:token!
        }
    })
    const data: CartResponse = await response.json()
    return data
}
export async function updateCartItemAction(productId: string,count:number) {
    const token = await getUserToken()
    const response = await fetch(`${process.env.API_URL}/cart/` + productId, {
        method: 'PUT',
        body: JSON.stringify({ count }),
        headers: {
            token:token!,
            'content-type': 'application/json'
        }
    })
    const data: CartResponse = await response.json()
    return data
}
export async function clearCartAction() {
    const token = await getUserToken()
    const response = await fetch(`${ process.env.API_URL }/cart`, {
        method: 'DELETE',
        headers: {
            token:token!
        }
    })
    const data: CartResponse = await response.json()
    return data
}