import ProductCard from '@/components/productCard/ProductCard'
import { CategoryI, ProductI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'

export default async function categoryDetails({ params }: { params: Params }) {
    const {categoryId}= await params
    // const { categoryDet } = await params
    // const categoryName = categoryDet[0]
    // const categoryIdValue = categoryDet[1]

    const categoryRes = await fetch('https://ecommerce.routemisr.com/api/v1/categories/' + categoryId)
    const { data: category }: { data: CategoryI } = await categoryRes.json()
    const productsResponse = await fetch('https://ecommerce.routemisr.com/api/v1/products?category[in]=' + categoryId)
    const { data: products }: { data: ProductI[] } = await productsResponse.json()

    return <>

        <h1 className='text-4xl '>{category.name}</h1>
        <p className='text-xl text-neutral-500 my-3'>Products from this category</p>
        {products.length > 0 ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
        xl:grid-cols-4  gap-2 '>
            {products.map((product) =>

                <ProductCard product={product} key={product._id} />

            )}</div>
            :
            <div className='min-h-[80vh] flex justify-center items-center'>

                <h2 className='text-neutral-500'>No products found from this category.</h2>
            </div>
        }
    </>
}
