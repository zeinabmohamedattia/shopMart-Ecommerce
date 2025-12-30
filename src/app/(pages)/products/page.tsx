import { ProductI } from '@/interfaces';
import ProductCard from '@/components/productCard/ProductCard';
export default async function Products() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const { data: products }: { data: ProductI[] } = await response.json()
  return <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3
    xl:grid-cols-4  gap-2 ">
      {products.map((product) =>
       <ProductCard product={product} key={product._id} />
      )}
    </div>
  </>
}
