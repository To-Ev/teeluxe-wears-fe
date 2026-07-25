import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductsSlice';

const ProductManagement = () => {

    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(
        (state) => state.adminProducts
    );
    
    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete the Product?")) {
            dispatch(deleteProduct(id))
            .unwrap()
            .then(() => {
                toast.success("Product deleted successfully!");
            })
            .catch((err) => {
                toast.error(`Failed to delete product: ${err}`);
            });
        }
    };

    if(loading) return <p className='text-xl text-green-300'>Loading...</p>
    if(error) return <p className='text-red-500 text-xl'>Error: {error}</p>

  return (
    <section className='max-w-7xl mx-auto py-6 text-gray-700'>
        <h2 className="text-2xl font-bold mb-6">Product Management</h2>
        <div className='mb-6'>
            <Link 
                to={`/admin/products/new`} 
                className='bg-purple-500 text-white px-3 py-3 rounded hover:bg-purple-600'>
                Add New Product
            </Link>
        
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-500">
                <thead className="bg-gray-100 text-left text-gray-700">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? products.map((product) => (
                        <tr 
                            key={product._id}
                            className='border-b border-gray-100 hover:bg-gray-50 cursor-pointer'
                        >
                            <td className='p-4 text-gray-800 whitespace-nowrap'>{product.name}</td>
                            <td className="p-4">N{product.price}</td>
                            <td className="p-4">{product.sku}</td>
                            <td className="flex flex-col gap-1 sm:flex-row p-4">
                                <Link 
                                    to={`/admin/products/${product._id}/edit`}
                                    className='bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600'
                                    >Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(product._id)}
                                    className='bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 cursor-pointer'>Delete
                                </button>
                            </td>
                        </tr>
                    )) : <tr>
                        <td colSpan={4} className='p-4 text-center text-gray-500 text-lg'>No products found.</td>
                    </tr>}
                </tbody>
            </table>
        </div>
    </section>
  )
}

export default ProductManagement