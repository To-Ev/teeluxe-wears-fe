import React from 'react'
import Hero from '../component/Layout/Hero'
import GenderSelectionSection from '../component/Products/GenderSelectionSection'
import NewArrivals from '../component/Products/NewArrivals'
import ProductsDetails from '../component/Products/ProductsDetails'
import ProductsGrid from '../component/Products/ProductsGrid'
import FeaturedProducts from '../component/Products/featuredProducts'
import FeaturedSection from '../component/Products/FeaturedSection'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchByFilters } from '../redux/slices/productsSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);

  useEffect(() => {
    // fetch product for a specific collection
    dispatch(
      fetchByFilters({ 
        section: "Wears", 
        category: "Bottom Wear",
        limit: 8,
      })
    );
    
    // fetch best seller products
    const fetchBestSellerProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        const data = await response.data;
        setBestSellerProducts(data);
      } catch (error) {
        console.error('Error fetching best seller products:', error);
      }
    };

    fetchBestSellerProducts();
  }, [dispatch]);


  return (
    <div>
      <Hero />
      <GenderSelectionSection />
      <NewArrivals />
      {/* Best seller Products */}
      <h1 className='text-3xl font-semibold text-center mb-4 text-gray-900'>
        Best Seller
      </h1>
      {bestSellerProducts ? (
        <ProductsDetails productId={bestSellerProducts._id} />
      ) : (
        <p className='text-center text-gray-500'>Loading best seller products...</p>
      )}
      <div className='container mx-auto mb-12'>
        <h1 className='text-center text-3xl font-bold mb-6 text-gray-700'>
          Top wears for women
        </h1>
        <ProductsGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedProducts />
      <FeaturedSection />
    </div>
  )
}

export default Home