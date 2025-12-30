'use client'
import Loading from '@/app/loading'
import { WishlistContext } from '@/components/context/WishlistContext'

import { Card, CardContent } from '@/components/ui/card'
import {  Trash2 } from 'lucide-react'
import Image from 'next/image'
import  { useContext } from 'react'
import { removeWishlistItemAction } from './_actions/wishlist.action'
import toast from 'react-hot-toast'
import AddToCart from '@/components/addToCart/AddToCart'
import Link from 'next/link'
import { formatCurrency } from '@/app/Helpers/formatCurrency'

export default function Wishlist() {
    let { wishlistData, isWishlistLoading, getWishlist, setWishlistData } = useContext(WishlistContext)
    async function removeWishlistItem(productId: string) {
        const data = await removeWishlistItemAction(productId)
        if (data.status == 'success') {
            toast.success(data.message)
            await getWishlist()
        }
    }
    return <>
        {isWishlistLoading ? <Loading /> :
            <div className="container mx-auto ">
                <h1 className="text-3xl font-bold mb-5">My Wishlist</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 auto-rows-fr">
                    {wishlistData?.data.map((product) => (
                        <Card
                            key={product.id}
                            className="rounded-2xl shadow p-2  hover:border-teal-400 transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                        >
                            <CardContent className="p-4 flex flex-col h-full  ">
                                <Link href={`products/${product.id}`}>
                                    <div className="relative">
                                        <Image width={300} height={300}
                                            src={product.imageCover}
                                            alt={product.title}
                                            className="w-full h-80 object-cover  "
                                        />
                                    </div>

                                    <div className="mt-4  flex items-center justify-between">
                                        <h2 className="font-semibold text-lg">{product.title.split(' ', 2).join(' ')}</h2>
                                        <p className="text-gray-700">{formatCurrency(product.price!)}</p>
                                    </div>
                                </Link>
                                <div className="mt-4 flex gap-3 items-center">
                                    <AddToCart productId={product.id} />
                                    <Trash2 className="siz-5 text-red-500 cursor-pointer" onClick={() => removeWishlistItem(product.id)} />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

        }


    </>
}
