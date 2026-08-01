import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchAdminProducts } from '../../redux/slices/adminProductsSlice';

const ProductManagement = () => {

    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(
        (state) => state.adminProducts
    );

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    
    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

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
                                    onClick={() => {
                                        setProductToDelete(product._id);
                                        setShowModal(true);
                                    }}
                                    className='bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 cursor-pointer'
                                >Delete
                                </button>
                            </td>
                        </tr>
                    )) : <tr>
                        <td colSpan={4} className='p-4 text-center text-gray-500 text-lg'>No products found.</td>
                    </tr>}
                </tbody>
            </table>
        </div>
        {/* Modal goes here, outside the form but inside the section */}
        {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
                <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowModal(false)}
                >
                Cancel
                </button>
                <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                    dispatch(deleteProduct(productToDelete))
                        .unwrap()
                        .then(() => {
                            toast.success("Product deleted successfully!");
                        })
                        .catch((err) => {
                            toast.error(`Failed to delete product: ${err}`);
                        });
                    setShowModal(false);
                    setProductToDelete(null);
                }}
                >
                Delete
                </button>
            </div>
            </div>
        </div>)}
    </section>
  )
}

export default ProductManagement