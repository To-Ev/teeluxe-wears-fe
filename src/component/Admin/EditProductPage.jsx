import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/slices/productsSlice';
import axios from 'axios';
import { updateProduct } from '../../redux/slices/adminProductsSlice';
import toast from 'react-hot-toast';

const EditProductPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {selectedProduct, loading, error} = useSelector(state => state.products);

    // Modal
    const [showModal, setShowModal] = React.useState(false);
    const [imageToDelete, setImageToDelete] = React.useState(null);


    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        discountPrice: "",
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        section: "",
        images: [],
    });

    const [uploading, setUploading] = useState(false); // Image uploading state

    useEffect(() => {
        if(id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if(selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setProductData((prevData) => ({...prevData, [name]: value}))
    };

    const handleImageUpload = async (e) =>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }],
            }));
            setUploading(false);
            toast.success("Image upload successfully!");
        } catch (err) {
            console.error(err);
            setUploading(false);
            toast.error("Failed to upload image. Please try again.");
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(updateProduct(productData))
        .unwrap()
        .then(() => {
            toast.success("Product updated successfully!");
            navigate("/admin/products");
        })
        .catch((err) => {
            toast.error(`Failed to update product: ${err}`);
        });
    };
    
    if(loading) return <p className='text-xl text-green-300'>Loading...</p>
    if(error) return <p className='text-red-500 text-xl'>Error: {error}</p>

  return (
    <section className='max-w-7xl mx-auto p-6 shadow-md rounded-md text-gray-700'>
        <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit}>
            {/* Name  */}
            <div className="mb-6">
                <label className='block font-semibold mb-2'>Product Name</label>
                <input 
                    type="text" 
                    name='name'
                    value={productData.name} onChange={handleChange}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                    required
                    placeholder='Product name...'
                />
            </div>
            {/* Description  */}
            <div className="mb-6">
                <label className="block font-semibold mb-2">Description</label>
                <textarea 
                    name="description" value={productData.description} className="w-full focus:outline-green-200 bg-gray-100 rounded-md p-2"
                    placeholder='Write description...'
                    onChange={handleChange}
                    rows={4}
                    required
                />
            </div>
            {/* Price  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Price</label>
                <input 
                    type="number" 
                    name='price'
                    step="any"
                    value={productData.price} onChange={handleChange}
                    min={0}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                />
            </div>
            {/*Discount Price  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Discount Price</label>
                <input 
                    type="number" 
                    name='discountPrice'
                    step="any"
                    value={productData.discountPrice} onChange={handleChange}
                    min={0}
                    placeholder='Optional'
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                />
            </div>
            {/* Count in Stock  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Count in Stock</label>
                <input 
                    type="number" 
                    name='countInStock'
                    value={productData.countInStock} onChange={handleChange}
                    min={0}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                />
            </div>
            {/* SKU  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>SKU (Stock Keeping Unit)</label>
                <input 
                    type="text" 
                    name='sku'
                    value={productData.sku} onChange={handleChange}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                    placeholder='VNECK-CLS-010'
                />
            </div>
            {/* Category  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Category</label>
                <select
                    name='category'
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full rounded-md focus:outline-green-200 bg-gray-100 p-3">
                    <option value="">Choose Category</option>
                    <option value="Two Piece Sets">TWO PIECE SETS</option>
                    <option value="Bubus">BÚBÚS</option>
                    <option value="Kaftans">KAFTANS</option>
                    <option value="Aso Oke">AṢỌ ÒKÈ</option>
                </select>
            </div>
            {/* Section  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Section</label>
                <select
                    name='section'
                    value={productData.section}
                    onChange={handleChange}
                    className="w-full rounded-md focus:outline-green-200 bg-gray-100 p-3">
                    <option value="">Choose Section</option>
                    <option value="Accessories">ACCESSORIES</option>
                    <option value="Clothing">CLOTHING</option>
                </select>
            </div>
            {/* Brand  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Brand</label>
                <input 
                    type="text" 
                    name='brand'
                    value={productData.brand} onChange={handleChange}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                    placeholder='ActiveWear || ChillZone || UrbanStyle...'
                />
            </div>
            {/* Material */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Material</label>
                <input 
                    type="text" 
                    name='material'
                    value={productData.material} onChange={handleChange}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                    placeholder='Polyester || Cotton || Cotton Blend...'
                />
            </div>
            {/* Collections  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Collections</label>
                <input 
                    type="text" 
                    name='collections'
                    value={productData.collections} onChange={handleChange}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                    placeholder='Casual Collection || Urban Collection || Lounge Collection..'
                />
            </div>
            {/* Sizes  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Sizes (comma-separated)</label>
                <input 
                    type="text" 
                    name='sizes'
                    value={productData.sizes.join(", ")} 
                    onChange={(e) => setProductData({...productData, 
                        sizes: e.target.value.split(",").map((size) => size.trim())
                    })}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                    placeholder='S, M, X, XL'
                />
            </div>
            {/* Color  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Colors (comma-separated)</label>
                <input 
                    type="text" 
                    name='color'
                    value={productData.colors.join(", ")} 
                    onChange={(e) => setProductData({...productData, 
                        colors: e.target.value.split(",").map((color) => color.trim())
                    })}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                    placeholder='Red, Black'
                />
            </div>
            {/* Image Upload  */}
            <div className='mb-6'>
                <label className='block font-semibold mb-2'>Upload Image</label>
                <input 
                    type="file" 
                    name='images'
                    onChange={handleImageUpload}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
                />
                {uploading && <p className='text-gray-500'>Uploading Image...</p>}
                <div className="flex gap-4 mt-4"> 
                    {productData.images.map((image, index) => (
                        <div key={index} className="">
                            <img 
                                src={image.url} 
                                alt={image.altText || "Product image"} 
                                className="w-20 h-20 object-cover rounded-md cursor-pointer"
                                onClick={() => {
                                    setImageToDelete(index); // store index of clicked image
                                    setShowModal(true);      // open modal
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button 
                type='submit'
                className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors cursor-pointer'>
                {loading ? "Loading..." : "Update Product"}
            </button>
        </form>
        {/* Modal goes here, outside the form but inside the section */}
        {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h3 className="text-lg font-semibold mb-4">Delete Image</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this image?</p>
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
                    setProductData({
                    ...productData,
                    images: productData.images.filter((_, i) => i !== imageToDelete)
                    });
                    setShowModal(false);
                    setImageToDelete(null);
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

export default EditProductPage