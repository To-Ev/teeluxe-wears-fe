import React, { useState, useEffect } from 'react';
import {toast} from 'react-hot-toast';
import ProductsGrid from './ProductsGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slices/productsSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi2'
import { FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from "react-icons/fa";
import StarRating from './StarRating';
import ProductTabs from './ProductTabs';
import { fetchProductReviews } from '../../redux/slices/reviewsSlice';

const ProductsDetails = ({ productId }) => {
    
    const { id } = useParams();
    const dispatch = useDispatch();
    const {selectedProduct, loading, error, similarProducts} = useSelector(state => state.products);
    const { user, guestId }= useSelector(state => state.auth);
    const { byProduct, loading: reviewsLoading } = useSelector(state => state.reviews);
    
    const productFetchId = productId || id;
    const reviews = byProduct[productFetchId] || [];


    const [mainImage, setMainImage] = useState(selectedProduct?.images?.[0]?.url);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [isButtonAllowed, setIsButtonAllowed] = useState(false);

    useEffect(() => {
        if(productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts(productFetchId));

            // Fetch product reviews
            dispatch(fetchProductReviews(productFetchId));
        }
    }, [dispatch, productFetchId])

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

            dispatch(addToCart({
                productId: productFetchId,
                color: selectedColor,
                size: selectedSize,
                quantity: selectedQuantity,
                userId: user?._id,
                guestId,
            }))
            .then(() => {
                toast.success('Product added to cart successfully!', {duration: 2000});
            }).finally(() => {
                setIsButtonAllowed(false);
            });

            if(loading) {
                toast.loading('Adding product to cart...', {duration: 2000});
            }
            if(error) {
                toast.error(error.response.message || 'Failed to add product to cart.', {duration: 2000});
            }
            
        } catch (error) {
            console.error(error)
            toast.error(error.response.message || 'Server error')
        }finally{
            setSelectedColor("")
            setSelectedSize("")
        }
       
    }
    // for production, the main image is set to the first image in the product's image array. If the product or its images are not available, it defaults to an empty string. This ensures that the component has a valid main image to display when it renders.
    useEffect(() => {
        if(selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url)
        }
    }, [selectedProduct]);

    if (loading) {
        return <p className="text-center text-green-400 text-xl p-6">Loading product...</p>;
    }

    if (error && !selectedProduct) {
        return <p className="text-center text-red-400 text-xl p-6">{error}</p>;
    }

    if (!loading && !error && !selectedProduct) {
        return <p className="text-center text-gray-400 text-xl p-6">Product not found.</p>;
    };

  return (
    <section className='p-6'>
        {selectedProduct &&
            <div  className='max-w-6xl mx-auto p-0 h-full'>
                {/* Product Details */}
                <div className='flex flex-col h-full'>
                    {/* Top */}
                    <div className='flex flex-col lg:flex-row items-stretch'>
                        {/* Left */}
                        <div className='flex flex-1 mb-5 lg:mb-0 flex-col md:flex-row'>
                            {/* Thumbnails images */}
                            <div className='hidden md:flex flex-col mr-6'>
                                {
                                    selectedProduct.images.map((image, index) =>(
                                        <div key={index} className={`w-20 h-20 rounded-lg mb-3 overflow-hidden ${mainImage === image.url ? 'ring-2 ring-gray-700' : 'border-gray-500'}`}>
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
                            <div className='flex-1 flex items-center justify-center mb-4 md:mb-0'>
                                <img   
                                src={mainImage} 
                                alt="Main Image" 
                                className='rounded-lg w-full max-w-lg md:aspect-4/5 h-full object-cover'
                                />
                            </div>
                            {/*Mobile Thumbnails */}
                            <div className='flex md:hidden flex-row space-x-4 mb-4 md:mb-0 overscroll-x-scroll'>
                                {
                                    selectedProduct.images.map((image, index) =>(
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
                        </div>
                        {/* Right side */}
                        <div className='lg:w-1/2 lg:ml-10 mx-auto w-full flex-1'>
                            <h1 className='font-semibold text-4xl mb-3 text-gray-700'>
                                {selectedProduct.name}
                            </h1>
                            {/* Stars rating and reviews */}
                            <div className='flex items-center text-gray-700 mb-4'>
                                <StarRating rating={selectedProduct.rating} />
                                <p className='ml-3 text-sm font-semibold text-gray-500'>{selectedProduct.rating}</p>
                                <p className='text-sm'>({selectedProduct.numReviews} reviews)</p>
                            </div>
                            {/* Price */}
                            <div className='flex gap-3 items-end mb-4'>
                                <p className='text-3xl text-gray-600 font-semibold'>
                                    N{selectedProduct.price.toLocaleString()}
                                </p>
                                <p className='text-lg text-gray-500 line-through'>
                                {selectedProduct.discountPrice > 0 ? 
                                `N${selectedProduct.discountPrice.toLocaleString()}` : ""}
                                </p>
                            </div>
                            <p className='text-gray-800 mb-2 pb-5 border-b border-gray-200'>
                                {selectedProduct.description}
                            </p>
                            <div className='flex flex-col justify-between h-3/5'>
                                {/* selected colors */}
                                <div className='mb-4 mt-5'>
                                    <p className='text-gray-700 font-semibold mb-2'>Colors: <span className='font-medium'>{selectedColor}</span></p>
                                    <div className='flex gap-3 mt-1'>
                                        {selectedProduct.colors.map((color, index) =>(
                                            <button key={index}
                                                className={`w-8 h-8 rounded-full cursor-pointer 
                                                ${selectedColor === color 
                                                ? 'border-2 border-white ring-2 ring-black' 
                                                : 'border border-white'}`}
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
                                    <p className='text-gray-700 font-semibold mb-3'>Sizes: <span className='font-medium'>{selectedSize}</span></p>
                                    <div className='flex gap-3 mt-1'>
                                        {selectedProduct.sizes.map((size, index) =>(
                                            <button 
                                                onClick={() => {setSelectedSize(size)}}
                                                key={index}
                                                className={`text-sm cursor-pointer font-semibold px-5 py-2 border border-gray-200 rounded text-gray-900  transition ${selectedSize === size ? 'bg-black text-white' : ''}`}>
                                                    {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Add to cart Button and Quantity*/}
                                <div className='flex items-start justify-center flex-col lg:flex-row'>
                                    <div className='w-2/5 flex items-center flex-none gap-3 mt-3 lg:mb-0 mb-3'>
                                        <button className='border border-gray-200 px-5 py-0 lg:py-1 rounded text-3xl cursor-pointer text-gray-700'
                                        onClick={() =>handleQuantityChange("minus")}
                                        >-</button>
                                        <span className='mx-1 text-xl font-semibold border px-5 py-1 lg:py-2 rounded border-gray-200 text-gray-600'>{selectedQuantity}</span>
                                        <button className='border border-gray-200 px-4 py-0 lg:py-1 rounded text-3xl cursor-pointer text-gray-700'
                                        onClick={() =>handleQuantityChange("plus")}
                                        >+</button>
                                    </div>
                                    <button 
                                        onClick={() =>handleAddToCart()}
                                        disabled={isButtonAllowed}
                                        className={`grow w-full mt-3 lg:w-3/5 bg-black text-white rounded-lg px-6 py-3 cursor-pointer ${isButtonAllowed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}>
                                            {isButtonAllowed ? ('Please wait...') : (
                                                <span className="flex items-center justify-center gap-2">
                                                <FiShoppingBag className='w-6 h-6'/> Add to Cart
                                                </span>
                                            )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom */}
                    <div>
                        <ProductTabs 
                            product={selectedProduct} 
                            reviews={reviews}  
                            reviewsLoading={reviewsLoading}
                        />
                    </div>
                    
                </div>
                {/* Similar Product */}
                <div className='mt-15'>
                    <h1 className='text-center text-2xl text-gray-700 font-bold mb-10'>
                        You may also like
                    </h1>
                    <ProductsGrid products={similarProducts} loading={loading} error={error}/>
                </div>
            </div>
        }
    </section>
  );
};

export default ProductsDetails