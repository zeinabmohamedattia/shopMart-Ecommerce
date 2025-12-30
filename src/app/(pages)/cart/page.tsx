'use client'
import Loading from '@/app/loading'
import CheckOut from '@/components/checkOut/CheckOut'
import { CartContext } from '@/components/context/CartContext'
import { Button } from '@/components/ui/button'
import {  Loader, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { clearCartAction, removeCartItemAction, updateCartItemAction } from './_cartActions/cart.action'
import { formatCurrency } from '@/app/Helpers/formatCurrency'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Badge } from '@/components/ui/badge'

export default function Cart() {
    let { cartData, isLoading, getCart, setCartData } = useContext(CartContext)
    const [removingId, setRemovingId] = useState<null | string>(null)
    const [updatingId, setUpdatingId] = useState<null | string>(null)
    const [isClearing, setIsClearing] = useState<boolean>(false)
    useEffect(() => {
        if (typeof cartData?.data.products[0]?.product == 'string' || cartData == null) {
            getCart()
        }
    }, []) 
    async function removeCartItem(productId: string) {
        setRemovingId(productId)
        const data = await removeCartItemAction(productId)
        if (data.status == 'success') {
            toast.success('product deleted successfully')
            setCartData(data)
        }
        setRemovingId(null)
    }
    async function updateCartItem(productId: string, count: number) {
        setUpdatingId(productId)
        const data = await updateCartItemAction(productId, count)
        if (data.status == 'success') {
            toast.success('product quantity updated successfully')
            setCartData(data)
        }
        setUpdatingId(null)
    }
    async function clearCart() {
        setIsClearing(true)
        const data = await clearCartAction()
        if (data.message == 'success') {
            setCartData(null)
        }
        setIsClearing(false)
    }
 
    return <>
        {isLoading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading /> : cartData?.numOfCartItems! > 0 ?
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className='text-4xl font-bold tracking-tight text-gray-900'>Shopping Cart</h1>
                        <p className='text-muted-foreground mt-2 text-lg'>
                            <span className="font-semibold text-teal-600">{cartData?.numOfCartItems}</span> items in your cart
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartData?.data.products.map((item) => (
                                <Card key={item._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200">
                                    <CardContent className="p-0">
                                        <div className="flex gap-4 p-4 md:p-5">
                                            {/* Product Image */}
                                            <div className="relative shrink group">
                                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                                    <img
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                                                    />
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                                                    <div className='flex-1'>
                                                        <h3 className='font-bold text-base md:text-lg line-clamp-2 text-gray-900 hover:text-teal-600 transition-colors'>
                                                            {item.product.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Badge variant="secondary" className='text-xs bg-teal-50 text-teal-700 hover:bg-teal-100'>
                                                                {item.product.brand.name}
                                                            </Badge>
                                                            <span className='text-xs text-muted-foreground'>•</span>
                                                            <span className='text-sm text-muted-foreground'>
                                                                {item.product.category.name}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='text-right'>
                                                        <div className="text-2xl font-bold text-gray-900">
                                                            {formatCurrency(item.price!)}
                                                        </div>
                                                        {item.count > 1 && (
                                                            <div className="text-xs text-muted-foreground mt-1">
                                                                {formatCurrency(item.price!)} each
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            aria-label='decrease'
                                                            disabled={item.count == 1}
                                                            onClick={() => updateCartItem(item.product.id, item.count - 1)}
                                                            className='h-9 w-9 rounded-lg hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 disabled:opacity-50'
                                                        >
                                                            -
                                                        </Button>
                                                        <div className="w-12 text-center">
                                                            {updatingId == item.product.id ? (
                                                                <Loader className='animate-spin h-4 w-4 mx-auto' />
                                                            ) : (
                                                                <span className="font-semibold text-base">{item.count}</span>
                                                            )}
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            aria-label='increase'
                                                            onClick={() => updateCartItem(item.product.id, item.count + 1)}
                                                            className='h-9 w-9 rounded-lg hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700'
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        onClick={() => removeCartItem(item.product.id)}
                                                        aria-label='remove'
                                                        className='text-sm text-destructive hover:text-destructive cursor-pointer hover:bg-red-50 gap-2'
                                                    >
                                                        {removingId == item.product.id && <Loader className='animate-spin h-4 w-4' />}
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
                            <Card className="border-gray-200 shadow-lg">
                                <CardHeader className="pb-4">
                                    <CardTitle className='text-2xl font-bold'>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Subtotal */}
                                    <div className='flex items-center justify-between py-2'>
                                        <div>
                                            <span className='text-sm text-muted-foreground block'>Subtotal</span>
                                            <span className='text-xs text-muted-foreground'>{cartData?.numOfCartItems} items</span>
                                        </div>
                                        <span className='font-bold text-lg'>{formatCurrency(cartData?.data?.totalCartPrice!)}</span>
                                    </div>

                                    {/* Shipping */}
                                    <div className="flex items-center justify-between py-2">
                                        <span className='text-sm text-muted-foreground'>Shipping</span>
                                        <Badge variant="secondary" className='bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold'>
                                            Free
                                        </Badge>
                                    </div>

                                    <Separator />

                                    {/* Total */}
                                    <div className='flex items-center justify-between py-2'>
                                        <span className='text-lg font-bold text-gray-900'>Total</span>
                                        <span className='text-2xl font-bold text-gray-900'>{formatCurrency(cartData?.data?.totalCartPrice!)}</span>
                                    </div>

                                    {/* Checkout Button */}
                                    <CheckOut cartId={cartData?.cartId!} />

                                    {/* Continue Shopping */}
                                    <Link href={'/products'}>
                                        <Button variant="outline" className='w-full text-base border-2 cursor-pointer hover:bg-gray-50'>
                                            Continue Shopping
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Clear Cart Button */}
                            <Button
                                variant='outline'
                                onClick={clearCart}
                                className='w-full border-2 cursor-pointer  border-red-200 text-destructive hover:text-destructive hover:bg-red-50 gap-2'
                            >
                                {isClearing ? <Loader className="animate-spin h-4 w-4 " /> : <Trash2 className="h-4 w-4" />}
                                Clear Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="flex min-h-[75vh] items-center justify-center flex-col px-4">
                <Card className="max-w-md w-full text-center p-8 shadow-lg">
                    <CardContent className="space-y-6 pt-6">
                        <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                            <ShoppingCart className="h-12 w-12 text-gray-400" />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Your Cart Is Empty</h2>
                            <p className='text-muted-foreground'>Start adding some products to your cart!</p>
                        </div>
                        <Link href={'/products'}>
                            <Button size="lg" className="w-full">
                                Browse Products
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        }

    </>
}
