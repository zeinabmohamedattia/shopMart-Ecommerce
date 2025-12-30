'use client'
import { useContext, useState, useMemo } from 'react'
import { HeartIcon, Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToWishlistAction } from './_actions/addToWishlist.action'
import { WishlistContext } from '../context/WishlistContext'
import { removeWishlistItemAction } from '@/app/(pages)/wishlist/_actions/wishlist.action'
import toast from 'react-hot-toast'
export default function AddToWishlist({ productId }: { productId: string }) {
    const { wishlistData, getWishlist } = useContext(WishlistContext)
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    const isInWishlist = useMemo(() => {
        return wishlistData?.data?.some(product => product.id === productId) || false
    }, [wishlistData, productId])

    async function toggleWishlist() {
        if (session.status !== 'authenticated') {
            router.push('/login')
            return
        }

        setIsLoading(true)
        try {
            if (isInWishlist) {
                // Remove from wishlist
                const data = await removeWishlistItemAction(productId)
                if (data.status === 'success') {
                    toast.success('Product removed from wishlist')
                    await getWishlist()
                }
            } else {
                // Add to wishlist
                const data = await addToWishlistAction(productId)
                if (data.status === 'success') {
                    toast.success('Product added to wishlist')
                    await getWishlist()
                }
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={toggleWishlist}
            disabled={isLoading}
            className="flex items-center cursor-pointer justify-center"
        >
            {isLoading ? (
                <Loader color='red' className="animate-spin" />
            ) : (
                <HeartIcon
                    className={`cursor-pointer transition-all ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                        }`}
                    size={24}
                />
            )}
        </button>
    )
}