import ProductCard from '@/components/productCard/ProductCard'
import { BrandI, ProductI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'

export default async function BrandDetails({ params }: { params: Params }) {
    const { brandId } = await params    
   

    const brandRes = await fetch('https://ecommerce.routemisr.com/api/v1/brands/' + brandId)
        const { data: brand }: { data: BrandI } = await brandRes.json()
    const productsResponse = await fetch('https://ecommerce.routemisr.com/api/v1/products?brand[in]=' + brandId)
    const { data: products }: { data: ProductI[] } = await productsResponse.json()
    return <>

        <h1 className='text-4xl '>{brand.name}</h1>
        <p className='text-xl text-neutral-500 my-3'>Products from this brand</p>
        {products.length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4  gap-2 '>
            {products.map((product) =>
                <ProductCard product={product} key={product._id} />
            )}</div>
            :
            <div className='min-h-[80vh] flex justify-center items-center'>

                <h2 className='text-neutral-500'>No products found from this brand.</h2>
            </div>
        }
    </>
}
