import { Card, CardContent } from '@/components/ui/card';
import { BrandI } from '@/interfaces';
import Link from 'next/link';
import React from 'react'

export default async function Brands() {

   const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
    const { data: brands }: { data: BrandI[] } = await response.json()
  return <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Brands</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Card key={brand._id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={`brands/${brand._id}`}>
              <CardContent className="flex flex-col items-center justify-center p-4 min-h-[180px]">
                <div className="flex-1 flex items-center justify-center w-full mb-3">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-w-full max-h-32 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{brand.name}</h3>
              </CardContent>
          </Link>
            </Card>
        ))}
      </div>
    </div>
  </>
}
