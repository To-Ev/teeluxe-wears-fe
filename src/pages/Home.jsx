import React from 'react'
import Hero from '../component/Layout/Hero'
import GenderSelectionSection from '../component/Products/GenderSelectionSection'
import NewArrivals from '../component/Products/NewArrivals'
import ProductsDetails from '../component/Products/ProductsDetails'
import ProductsGrid from '../component/Products/ProductsGrid'
import FeaturedProducts from '../component/Products/featuredProducts'
import FeaturedSection from '../component/Products/FeaturedSection'

const placeHolderProducts = [
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
  {
    _id: 5,
    name: "product 5",
    price: 300,
    image: [{url: "https://picsum.photos/500/500?random=5"}]
  },
  {
    _id: 6,
    name: "product 6",
    price: 300,
    image:  [{url: "https://picsum.photos/500/500?random=6"}]
  },
  {
    _id: 7,
    name: "product 7",
    price: 300,
    image:  [{url: "https://picsum.photos/500/500?random=7"}]
  },
  {
    _id: 8,
    name: "product 8",
    price: 300,
    image:  [{url: "https://picsum.photos/500/500?random=8"}]
  },
]

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderSelectionSection />
      <NewArrivals />
      {/* Best seller Products */}
      <h1 className='text-3xl font-semibold text-center mb-4 text-gray-900'>
        Best Seller
      </h1>
      <ProductsDetails />
      <div className='container mx-auto mb-12'>
        <h1 className='text-center text-3xl font-bold mb-6 text-gray-700'>
          Top wears for women
        </h1>
        <ProductsGrid products={placeHolderProducts}/>
      </div>
      <FeaturedProducts />
      <FeaturedSection />
    </div>
  )
}

export default Home