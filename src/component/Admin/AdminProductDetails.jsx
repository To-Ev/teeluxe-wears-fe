import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productsSlice";
import StarRating from "../Products/StarRating";

const AdminProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct } = useSelector(state => state.products);

    const productId = id;

    useEffect(() => {
        if(productId) {
            dispatch(fetchProductDetails(productId));
           
        }
    }, [dispatch, productId])

  return (
    <div className="bg-white shadow-lg rounded-lg p-2 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h1>
        <span className="text-sm text-gray-500">SKU: {selectedProduct.sku}</span>
      </div>

      {/* Image + Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={selectedProduct.images[0].url}
            alt={selectedProduct.images[0].altText}
            className="rounded-lg shadow-md max-h-80 object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <p className="text-gray-600">{selectedProduct.description}</p>

          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold text-gray-700">
              N{selectedProduct.discountPrice}
            </span>
            <span className="text-sm line-through text-gray-400">
              N{selectedProduct.price}
            </span>
          </div>

          <p className="text-sm text-gray-700">
            In Stock: <span className="font-medium">{selectedProduct.countInStock}</span>
          </p>

          <div className="flex flex-wrap gap-2">
            {selectedProduct.sizes.map((size) => (
              <span
                key={size}
                className="px-3 py-1 border rounded text-sm text-gray-700"
              >
                {size}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedProduct.colors.map((color) => (
              <span
                key={color}
                className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-700"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Extra Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm text-gray-600">
        <div>
          <span className="font-semibold">Category:</span> {selectedProduct.category}
        </div>
        <div>
          <span className="font-semibold">Brand:</span> {selectedProduct.brand}
        </div>
        <div>
          <span className="font-semibold">Collection:</span>{" "}
          {selectedProduct.collections}
        </div>
        <div>
          <span className="font-semibold">Material:</span> {selectedProduct.material}
        </div>
        <div>
          <span className="font-semibold">Section:</span> {selectedProduct.section}
        </div>
        <div className="flex items-start lg:items-center gap-2">
          <span className="font-semibold">Rating:</span> 
          <span className="flex lg:flex-row flex-start lg:items-center gap-0 sm:gap-2 flex-col">
            <StarRating rating={selectedProduct.rating} />
            {selectedProduct.rating}({selectedProduct.numReviews} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
