import React, { useState } from 'react'

const EditProductPage = () => {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        section: "",
        images: [
            {
                url: "https://picsum.photos/500/500?random=1"
            },
            {
                url: "https://picsum.photos/150?random=2"
            },
        ],
    })

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setProductData((prevData) => ({...prevData, [name]: value}))
    };

    const handleImageUpload = (e) =>{
        const file = e.target.files[0];
        console.log(file);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(productData);
    }

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
                    value={productData.price} onChange={handleChange}
                    min={0}
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
                 <label className='block font-semibold mb-2'>SKU</label>
                <input 
                    type="text" 
                    name='sku'
                    value={productData.sku} onChange={handleChange}
                    className='w-full rounded-md focus:outline-green-200 bg-gray-100 p-3'
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
                <div className="flex gap-4 mt-4"> 
                    {productData.images.map((image, index) =>(
                        <div key={index} className="">
                            <img 
                                src={image.url} alt={image.altText || "Product images"} 
                                className='w-20 h-20 object-cover rounded-md'
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button 
                type='submit'
                className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors cursor-pointer'>
                Update Product
            </button>
        </form>
    </section>
  )
}

export default EditProductPage