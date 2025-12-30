
import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MyStarIcon from '@/components/myStarIcon/myStarIcon';
import ProductSlider from '@/components/productSlider/ProductSlider';
import AddToCart from '@/components/addToCart/AddToCart';
import AddToWishlist from '@/components/addToWishlist/AddToWishlist';
import { formatCurrency } from '@/app/Helpers/formatCurrency';
import { Badge } from '@/components/ui/badge';
export default async function ProductDetails({ params }: { params: Params }) {
  let { productId } = await params

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)
  const { data: product }: { data: ProductI } = await response.json()

  return <>

    <div className='max-w-5xl mx-auto px-4 py-4'>
      <Card className='overflow-hidden border-gray-200 shadow-lg rounded-2xl'>
        <div className='grid md:grid-cols-2 gap-2'>
          {/* Image Section */}
          <div className='p-6 bg-gray-50'>
            <ProductSlider images={product.images} altContent={product.title} />
          </div>

          {/* Product Info Section */}
          <div className='p-2 flex flex-col'>
            <CardHeader className='px-0 pt-0 space-y-4'>
              {/* Brand Badge */}
              <div className='flex items-center gap-2'>
                <Badge variant="secondary" className='text-xs font-semibold text-teal-600 bg-teal-50 hover:bg-teal-100 uppercase tracking-wide'>
                  {product.brand.name}
                </Badge>
                {product.sold > 1000 && (
                  <Badge variant="secondary" className='text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 uppercase tracking-wide'>
                    Best Seller
                  </Badge>
                )}
              </div>

              {/* Title */}
              <CardTitle className='text-4xl md:text-3xl font-bold text-gray-900 leading-tight'>
                {product.title}
              </CardTitle>


              {/* Price */}
              <div className='bg-linear-to-r flex justify-between p-3 from-teal-50 to-blue-50 rounded-xl  '>
                <div>
                  <CardDescription className='text-sm mb-1'>Price</CardDescription>
                  <p className='text-2xl font-bold text-gray-900'>
                    {formatCurrency(product.price)}
                  </p>
              </div>
                <div className='flex flex-col items-start gap-4'>
                  <CardDescription className='text-sm'>
                   Reviews: {product.ratingsQuantity} 
                  </CardDescription>
                  <div className='flex items-center  '>
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <span className='text-lg font-bold text-gray-900 ml-1'>
                      {product.ratingsAverage}
                    </span>
                  </div>
                
                </div>
              </div>
              
            </CardHeader>

            <CardContent className='px-0 space-y-3  grow'>
              {/* Description */}
              <div className='py-2'>
                <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide mb-2'>
                  Description
                </h3>
                <CardDescription className='text-gray-700 leading-relaxed whitespace-pre-line'>
                  {product.description}
                </CardDescription>
              </div>

              {/* Product Details Grid */}
              <div className='grid grid-cols-2 gap-4'>
                <Card className='bg-gray-50 border-gray-200'>
                  <CardHeader className=''>
                    <CardDescription className='text-xs uppercase tracking-wide mb-1'>
                      Category
                    </CardDescription>
                    <CardTitle className='text-base font-semibold'>
                      {product.category.name}
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card className='bg-gray-50 border-gray-200'>
                  <CardHeader className=''>
                    <CardDescription className='text-xs uppercase tracking-wide mb-1'>
                      Subcategory
                    </CardDescription>
                    <CardTitle className='text-base font-semibold'>
                      {product.subcategory?.[0]?.name || 'N/A'}
                    </CardTitle>
                  </CardHeader>
                </Card>

                <Card className='bg-gray-50 border-gray-200'>
                  <CardHeader className=''>
                    <CardDescription className='text-xs uppercase tracking-wide mb-1'>
                      Availability
                    </CardDescription>
                    <CardTitle className='text-base font-semibold flex items-center gap-2'>
                      {product.quantity > 0 ? (
                        <>
                          <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                          In Stock ({product.quantity})
                        </>
                      ) : (
                        <>
                          <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                          Out of Stock
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                </Card>
 
                <Card className='bg-gray-50 border-gray-200'>
                  <CardHeader className=''>
                    <CardDescription className='text-xs uppercase tracking-wide mb-1'>
                      Units Sold
                    </CardDescription>
                    <CardTitle className='text-base font-semibold'>
                      {(() => {
                        const sold = product.sold;
                         const soldStr = String(sold);

                         if (soldStr.includes('e') || soldStr.includes('E')) {
                           const exponent = parseInt(soldStr.split(/e/i)[1]);
                          const base = parseFloat(soldStr.split(/e/i)[0]);

                          if (exponent >= 9) return `${base.toFixed(1)}B+`;
                          if (exponent >= 6) return `${base.toFixed(1)}M+`;
                          if (exponent >= 3) return `${base.toFixed(1)}K+`;
                        }

                        const soldNum = Number(sold);
                        if (soldNum >= 1000000000) return `${(soldNum / 1000000000).toFixed(1)}B+`;
                        if (soldNum >= 1000000) return `${(soldNum / 1000000).toFixed(1)}M+`;
                        if (soldNum >= 1000) return `${(soldNum / 1000).toFixed(1)}K+`;
                        return Math.floor(soldNum).toLocaleString();
                      })()}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
 
             
            </CardContent>

            {/* Action Buttons */}
            <CardFooter className='px-0 pb-0 gap-3 mt-auto pt-6'>
              <AddToCart productId={product._id} />
              <AddToWishlist productId={product._id} />
            </CardFooter>
          </div>
        </div>
      </Card>

    </div>
  </>
}
