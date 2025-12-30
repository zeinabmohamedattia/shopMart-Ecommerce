import { ProductI } from "./product"

export interface Order {
    shippingAddress: ShippingAddress
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    _id: string
    user: OrderUser
    cartItems: CartItem[]
    paidAt: string
    createdAt: string
    updatedAt: string
    id: number
    __v: number
}

export interface ShippingAddress {
    details: string
    city: string
    phone: string
}

export interface OrderUser {
    _id: string
    name: string
    email: string
    phone: string
}

export interface CartItem {
    count: number
    _id: string
    product: ProductI
    price: number
}

 

 