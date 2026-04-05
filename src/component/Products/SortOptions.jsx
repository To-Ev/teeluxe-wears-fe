import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) =>{
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <section className='flex items-center justify-end text-gray-500'>
      <select 
        id='sort'
        value={searchParams.get("sortBy") || ""}
        onChange={handleSortChange}
        className='mb-4 border border-gray-400 focus:outline-green-200 p-2 rounded-lg cursor-pointer'>
        <option value="">Default</option>
        <option value="priceACS">Price: High to Low</option>
        <option value="priceDCS">Price: Low to High</option>
        <option value="popularity">Popularity</option>
      </select>
    </section>
  )
}

export default SortOptions