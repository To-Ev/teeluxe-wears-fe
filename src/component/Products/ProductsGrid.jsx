import {Link} from 'react-router-dom'

const ProductGrid = ({products}) => {
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
        {
            products.map((product, index) =>
                <Link to={`/products/${product._id}`} key={index} className='block'>
                    <div className='text-gray-700 rounded-lg bg-white shadow-sm px-1 mx-2 mb-4'>
                        <div className='w-full h-96 mb-2'>
                            <img 
                                src={product.image[0].url} 
                                alt={product.image[0].altText || product.name} 
                                className='w-full h-full object-cover rounded-lg'
                            />
                        </div>
                        <h2 className='mb-1 px-2 text-md font-semibold'>{product.name}</h2>
                        <p className='text-md px-2 tracking-tighter pb-2'>N {product.price}</p>
                    </div>
                </Link>
            )
        }
        
    </section>
  )
}

export default ProductGrid