'use server'
import { getUserToken } from "@/app/Helpers/getUserToken"
export async function checkOutAction(cartId: string, details:string,city:string,phone:string) {
   const token= await getUserToken()
        const shippingAddress = {
            details,
            city,
            phone,
        }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            method: "POST",
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token!,
                'content-type': 'application/json'
            }
        })
        const data = await response.json()
      return data
}