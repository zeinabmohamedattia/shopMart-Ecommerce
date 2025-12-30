'use client'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader, ShoppingCartIcon } from 'lucide-react'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext'
import { addToCartAction } from '@/components/addToCart/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AddToWishlist from '../addToWishlist/AddToWishlist'
export default function AddToCart({ productId }: { productId: string }) {
    let { getCart, setCartData } = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const router = useRouter()
    async function addProductToCart() {
        if (session.status == 'authenticated') {
            setIsLoading(true)
            const data = await addToCartAction(productId)
            data.status == 'success' && toast.success('product added successfully')
            setCartData(data)
            //   await  getCart()
            setIsLoading(false)
        } else {
            router.push('/login')
        }

    }
    return <>
        
            <Button onClick={addProductToCart} className='grow cursor-pointer' >{isLoading ? <Loader className='animate-spin' /> : <ShoppingCartIcon />} Add To Cart</Button>
          
    </>
}
