import { ProductI } from '@/interfaces'
import AddToCart from '../addToCart/AddToCart'
import MyStarIcon from '../myStarIcon/myStarIcon'
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from '../ui/card'
import Image from 'next/image'
import Link from 'next/link'
import AddToWishlist from '../addToWishlist/AddToWishlist'
import { formatCurrency } from '@/app/Helpers/formatCurrency'

export default function ProductCard({ product }: { product: ProductI }) {
    return <>
        <div key={product.id}>
            <Card className='group relative overflow-hidden border-gray-200 hover:border-teal-400 transition-all duration-300 hover:shadow-xl rounded-xl'>
                <Link href={'/products/' + product.id}>
                    <CardHeader className='relative p-0'>
                        {/* Image Container with Overlay Effect */}
                        <div className='relative aspect-square overflow-hidden bg-gray-50'>
                            <Image
                                src={product.imageCover}
                                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                alt={product.title}
                                height={300}
                                width={300}
                            />
                            {/* Gradient Overlay on Hover */}
                            <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                        </div>

                        {/* Content Section */}
                        <div className='p-4 space-y-2'>
                            <CardDescription className='text-xs font-semibold text-teal-600 uppercase tracking-wide'>
                                {product.brand.name}
                            </CardDescription>
                            <CardTitle className='text-lg font-bold text-gray-900 line-clamp-2 min-h-14 leading-tight group-hover:text-teal-600 transition-colors'>
                                {product.title.split(' ', 2).join(' ')}
                            </CardTitle>
                            <CardDescription className='text-sm text-gray-500'>
                                {product.category.name}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className='flex justify-between items-center px-4 pb-4'>
                        <div className='flex items-center gap-1'>
                            <MyStarIcon />
                            <MyStarIcon />
                            <MyStarIcon />
                            <MyStarIcon />
                            <p className='text-sm font-semibold text-gray-700 ml-1'>{product.ratingsAverage}</p>
                        </div>
                        <p className='flex items-baseline gap-1'>

                            <span className='text-md font-bold text-gray-900'>{formatCurrency(product.price)}</span>
                        </p>
                    </CardContent>
                </Link>

                <CardFooter className='gap-2 px-4 pb-4 pt-0'>
                    <AddToCart productId={product._id} />
                    <AddToWishlist productId={product._id} />
                </CardFooter>
            </Card>
        </div>
    </>
}