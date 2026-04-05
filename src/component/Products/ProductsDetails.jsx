import React, { useState, useMemo,  } from 'react';
import {toast} from 'react-hot-toast';
import ProductsGrid from './ProductsGrid';

const ProductsDetails = () => {
    const selectedProduct = useMemo(() => ({
        _id: 1,
        name: "Stylish Dress",
        originalPrice: 220,
        price: 150,
        details: "This is a stylish dress and perfect for any occasion",
        brand: "fashion",
        material: "cotton",
        colors: ["Red", "Black"],
        sizes: ["S", "M", "L", "XL"],
        image: [
            {
                url: "https://picsum.photos/500/500?random=1",
                altText: "Spaghetti top 1",
            },
            {
                url: "https://picsum.photos/500/500?random=2",
                altText: "Spaghetti top 2",
            },
        ],
        quantity: 1,
    }), [])

    const similarProducts = [
        {
            _id: 1,
            name: "product 1",
            price: 300,
            image: [{url: "https://picsum.photos/500/500?random=1"}]
        },
        {
            _id: 2,
            name: "product 2",
            price: 300,
            image: [{url: "https://picsum.photos/500/500?random=2"}]
        },
        {
            _id: 3,
            name: "product 3",
            price: 300,
            image: [{url: "https://picsum.photos/500/500?random=3"}]
        },
        {
            _id: 4,
            name: "product 4",
            price: 300,
            image:  [{url: "https://picsum.photos/500/500?random=4"}]
        },
        
    ];

    const [mainImage, setMainImage] = useState(selectedProduct?.image?.[0]?.url || "");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isButtonAllowed, setIsButtonAllowed] = useState(false);

    const handleQuantityChange = (action) =>{
        if(action === "minus" && selectedQuantity > 1) setSelectedQuantity((prev) =>prev - 1);
        if(action === "plus") setSelectedQuantity((prev) =>prev + 1);
    }
    
    const handleAddToCart = () =>{
        try {
            if(!selectedColor || !selectedSize) {
                toast.error('Please select a color and size before adding to cart.')
                return;
            }
            setIsButtonAllowed(true);
            setTimeout(() => {
                toast.success("Product added to cart successfully.")
                setIsButtonAllowed(false)
            }, 2000);
        } catch (error) {
            console.error(error)
            toast.error(error.response.message || 'Server error')
        }finally{
            setSelectedColor("")
            setSelectedSize("")
        }
       
    }
    // for production, the main image is set to the first image in the product's image array. If the product or its images are not available, it defaults to an empty string. This ensures that the component has a valid main image to display when it renders.
    // useEffect(() => {
    //     if(selectedProduct?.image?.length > 0) {
    //         setMainImage(selectedProduct.image[0].url)
    //     }
    // }, [selectedProduct])

  return (
    <section className='p-6'>
        <div  className='max-w-6xl mx-auto p-8'>
            <div className='flex flex-col md:flex-row'>
                {/* Thumbnails images */}
                <div className='hidden md:flex flex-col mr-6'>
                    {
                        selectedProduct.image.map((image, index) =>(
                            <div key={index} className={`w-20 h-20 border rounded-lg mb-3 overflow-hidden ${mainImage === image.url ? 'border-black' : 'border-gray-500'}`}>
                                <img 
                                src={image.url} 
                                alt={image.altText} 
                                className='w-full h-full object-cover cursor-pointer'
                                onClick={() => {setMainImage(image.url)}}/>
                            </div>
                        ))
                    }
                </div>
                {/* Main Image */}
                <div className='mb-4'>
                    <img   
                    src={mainImage} 
                    alt="Main Image" 
                    className='rounded-lg w-full h-auto object-cover'
                    />
                </div>
                {/*Mobile Thumbnails */}
                <div className='flex md:hidden flex-row space-x-4 mb-4 overscroll-x-scroll'>
                    {
                        selectedProduct.image.map((image, index) =>(
                            <div key={index} className={`w-20 h-20 border rounded-lg mb-3 overflow-hidden ${mainImage === image.url ? 'border-black' : 'border-gray-500'}`}>
                                <img 
                                src={image.url} 
                                alt={image.altText} 
                                className='w-full h-full object-cover cursor-pointer'
                                onClick={() => {setMainImage(image.url)}}/>
                            </div>
                        ))
                    }
                </div>
                {/* Right side */}
                <div className='md:w-1/2 md:ml-10'>
                    <h1 className='font-semibold text-2xl md:text-3xl mb-2 text-gray-800'>{selectedProduct.name}</h1>
                    <p className='text-lg text-gray-500 line-through mb-1'>
                        N{ selectedProduct.originalPrice && 
                            `${selectedProduct.originalPrice}`
                        }
                    </p>
                    <p className='text-xl text-gray-800 font-semibold mb-2'>
                        N{selectedProduct.price}
                    </p>
                    <p className='text-gray-800 mb-2'>
                        {selectedProduct.details}
                    </p>
                    {/* selected colors */}
                    <div className='mb-4'>
                        <p className='text-gray-700'>colors:</p>
                        <div className='flex gap-3 mt-1'>
                            {selectedProduct.colors.map((color, index) =>(
                                <button key={index}
                                    className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color ? 'border-3 border-black' : 'border-gray-300'}`}
                                    style={
                                        {backgroundColor: color,
                                        filter: 'brightness(0.6)',
                                    }}
                                    onClick={() =>{setSelectedColor(color)}}
                                >
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* selected Sizes */}
                    <div className='mb-4'>
                        <p className='text-gray-700'>Sizes:</p>
                        <div className='flex gap-3 mt-1'>
                            {selectedProduct.sizes.map((size, index) =>(
                                <button 
                                    onClick={() => {setSelectedSize(size)}}
                                    key={index}
                                    className={`text-xl cursor-pointer px-2 border border-gray-200 rounded text-gray-900  transition ${selectedSize === size ? 'bg-black text-white' : ''}`}>
                                        {size}
                                </button>
                            ))}
                        </div>
                        
                    </div>
                    {/* selected Quantity */}
                    <div className='mb-4'>
                        <p className='text-gray-700'>Quantity:</p>
                        <div className='flex items-center gap-3 mt-1'>
                            <button className='bg-gray-300 px-2 py-1 rounded text-xl cursor-pointer text-gray-700'
                            onClick={() =>handleQuantityChange("minus")}
                            >-</button>
                            <span className='mx-1 text-lg font-semibold text-gray-700'>{selectedQuantity}</span>
                            <button className='bg-gray-300 px-2 py-1 rounded text-xl cursor-pointer text-gray-700'
                            onClick={() =>handleQuantityChange("plus")}
                            >+</button>
                        </div>
                        
                    </div>
                    <button 
                    onClick={() =>handleAddToCart()}
                    disabled={isButtonAllowed}
                    className={`w-full bg-black text-white rounded-lg px-6 py-2 cursor-pointer mb-4 ${isButtonAllowed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}>
                        {isButtonAllowed ? 'Adding...' : `ADD TO CART`}
                    </button>

                    <div className='mt-5 text-gray-700'>
                        <h1 className='text-2xl font-bold mb-4'>Characteristics</h1>
                        <table className='w-full text-left text-sm text-gray-600'>
                            <tbody>
                                <tr>
                                    <td className='py-1'>Brand</td>
                                    <td className='py-1'>{selectedProduct.brand}</td>
                                </tr>
                                <tr>
                                    <td className='py-1'>Material</td>
                                    <td className='py-1'>{selectedProduct.material}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='mt-15'>
                <h1 className='text-center text-2xl text-gray-700 font-bold mb-10'>
                    You may also like
                </h1>
                <ProductsGrid products={similarProducts}/>
            </div>
        </div>
    </section>
  );
};

export default ProductsDetails