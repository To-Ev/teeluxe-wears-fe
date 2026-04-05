import {Link} from 'react-router-dom'

const ProductGrid = ({products}) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {
            products.map((product, index) =>
                <Link to={`/products/${product._id}`} key={index} className='block'>
                    <div className='text-gray-700 rounded-lg bg-white p-4'>
                        <div className='w-full h-96 mb-2'>
                            <img 
                                src={product.image[0].url} 
                                alt={product.image[0].altText || product.name} 
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                        <h2 className='mb-2 text-sm'>{product.name}</h2>
                        <p className='text-sm tracking-tighter'>N {product.price}</p>
                    </div>
                </Link>
            )
        }
        
    </section>
  )
}

export default ProductGrid