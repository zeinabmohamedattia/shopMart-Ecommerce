import { Card, CardContent } from '@/components/ui/card';
import { CategoryI } from '@/interfaces';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
      const { data: categories }: { data: CategoryI[] } = await response.json()
  return <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category._id}
            className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden flex flex-col"
          >
            <Link href={`/categories/${category._id}`}>
            <div className="  w-full aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className=" w-full h-full object-cover"
              />
            </div>
            <CardContent  >
              <h3 className="text-xl font-semibold text-center">{category.name}</h3>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
    
  </>
}
