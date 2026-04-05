import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'

const FilterSideBar = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 100]);
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    category: "",
    section: "",
    brands: [],
    size: [],
    materials: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const category = ["Top", "Bottom"]
  const size = ["XS", "S", "M", "L", "XL", "XXL"]
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "ChicStyle",
    "Beach Breeze",
    "Street Style",
    "Modern Fit",
    "Fashionista"
  ]
  const section = ["Jewelries", "Wears"]

  useEffect(()=>{
    const params = Object.fromEntries([...searchParams])

    setFilter({
      category: params.category || "",
      section: params.section || "",
      size: params.size ? params.size.split(",") : [],
      brands: params.brands ? params.brands.split(",") : [],
      materials: params.materials ? params.materials.split(",") : [],
      color: params.color || "",
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100])
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    let newFilters = {...filter};

    if(type === "checkbox") {
      if(checked) {
        newFilters[name] = [...(newFilters[name] || []), value]
      }else{
        newFilters[name] = newFilters[name].filter(item => item !== value)
      }

    }else{
      newFilters[name] = value;
    }
    
    setFilter(newFilters);
    updateURLParams(newFilters);
    console.log(newFilters);
  }
  
  const updateURLParams = (newFilters) =>{
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) =>{
      if(Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","))
      }
      else if(newFilters[key]){
        params.append(key, newFilters[key])
      }
    });
    setSearchParams(params)
    navigate(`?${params.toString()}`)
  }

  const handlePriceChange = (e) =>{
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);

    const newFilter = {...filter, minPrice: 0, maxPrice: newPrice};
    setFilter(newFilter);
    updateURLParams(newFilter);
  }

  return (
    <section>
      <div className='p-4 text-gray-800'>
        <h1 className='text- text-2xl text-gray-700 mb-4'>Filter</h1>

        {/* category filter  */}
        <div className='p-3'>
          <label className='text-gray-600 text-md block mb-2'>Category</label>
          {
            category.map((category) =>
              <div key={category} className='flex items-center'>
                <input 
                  name='category'
                  type="radio" 
                  value={category}
                  checked={filter.category === category}
                  onChange={handleInputChange}
                  className='h-4 w-4 accent-red-400 cursor-pointer focus:ring-blue-400'
                />
                <span 
                  className='text-lg ml-2 tracking-tighter'>
                    {category}
                </span>
              </div>
            )
          }
        </div>

        {/* section filter  */}
        <div className='p-3'>
          <label className='text-gray-600 text-md block mb-2'>Section</label>
          {
            section.map((section) =>
              <div key={section} className='flex items-center'>
                <input 
                  name='section'
                  type="radio" 
                  value={section}
                  checked={filter.section === section}
                  onChange={handleInputChange}
                  className='h-4 w-4 accent-red-400 cursor-pointer'
                />
                <span 
                  className='text-lg ml-2 tracking-tighter'>
                    {section}
                </span>
              </div>
            )
          }
        </div>
        
        {/* Size filter  */}
        <div className='p-3'>
          <label className='text-gray-600 text-md block mb-2'>Size</label>
          {
            size.map((size) =>
              <div key={size} className='flex items-center'>
                <input 
                  name='size'
                  type="checkbox" 
                  value={size}
                  checked={filter.size.includes(size)}
                  onChange={handleInputChange}
                  className='h-4 w-4 accent-red-400 text-blue-500 cursor-pointer focus:ring-blue-400 '
                />
                <span 
                  className='text-lg ml-2 tracking-tighter'>
                    {size}
                </span>
              </div>
            )
          }
        </div>
        
        {/* Materials filter  */}
        <div className='p-3'>
          <label className='text-gray-600 text-md block mb-2'>Materials</label>
          {
            materials.map((materials) =>
              <div key={materials} className='flex items-center'>
                <input 
                  name='materials'
                  type="checkbox" 
                  value={materials}
                  checked={filter.materials.includes(materials)}
                  onChange={handleInputChange}
                  className='h-4 w-4 accent-red-400 cursor-pointer focus:ring-blue-400 '
                />
                <span 
                  className='text-lg ml-2 tracking-tighter'>
                    {materials}
                </span>
              </div>
            )
          }
        </div>
        
        {/* Brand filter  */}
        <div className='p-3'>
          <label className='text-gray-600 text-md block mb-2'>Brand</label>
          {
            brands.map((brands) =>
              <div key={brands} className='flex items-center'>
                <input 
                  name='brands'
                  type="checkbox" 
                  value={brands}
                  checked={filter.brands.includes(brands)}
                  onChange={handleInputChange}
                  className='h-4 w-4 accent-red-400 cursor-pointer focus:ring-blue-400'
                />
                <span 
                  className='text-lg ml-2 tracking-tighter'>
                    {brands}
                </span>
              </div>
            )
          }
        </div>

        {/* Price Range Section  */}
        <div className='p-6'>
          <label className='block mb-2'>Price Range</label>
          <input 
            type="range" name='priceRange' min={0} max={100}
            value={priceRange[1]}
            onChange={handlePriceChange}
            className='w-full bg-gray-400 appearance-none rounded-lg h-2'
          />
          <div className='flex justify-between font-semibold cursor-pointer text-sm'>
            <span>N0</span>
            <span>N{priceRange[1]}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FilterSideBar