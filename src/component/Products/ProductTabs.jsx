import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductReview } from "../../redux/slices/productsSlice";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const ProductTabs = React.memo(({ product }) => {
    const [activeTab, setActiveTab] = useState("details");
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);

    // Handle and update the star ratings and reviews
    const handleRate = (newRating, e) => {

        e.preventDefault();
        e.stopPropagation();
        // Update average rating
        const totalRating = rating * numReviews;
        const updatedNumReviews = numReviews + 1;
        const updatedRating = (totalRating + newRating) / updatedNumReviews;

        setRating(updatedRating);
        setNumReviews(updatedNumReviews);

        dispatch(addProductReview({
            id: product._id,
            rating: newRating,
            comment: "Loved it!"
        }))
        .unwrap()
        .then(() => toast.success("Review submitted"))
        .catch(err => {
            // rollback to original product values
            setRating(product.rating);
            setNumReviews(product.numReviews);
            toast.error(typeof err === "string" ? err : "Failed to add review");
        });

    };

  return (
    <div>
      {/* Tab buttons */}
        <div className="flex mt-10 gap-6 justify-center text-gray-700 text-lg font-semibold">
            <button
            className={`px-4 py-2 cursor-pointer ${activeTab === "description" ? "border-b-2 border-gray-500 text-xl" : "text-gray-500"}`}
            onClick={() => setActiveTab("description")}
            >
            Description
            </button>
            <button
            className={`px-4 py-2 cursor-pointer ${activeTab === "details" ? "border-b-2 border-gray-500 text-xl" : "text-gray-500"}`}
            onClick={() => setActiveTab("details")}
            >
            Additional Information
            </button>
            <button
            className={`px-4 py-2 cursor-pointer ${activeTab === "reviews" ? "border-b-2 border-gray-500 text-xl" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
            >
            Reviews
            </button>
        </div>

      {/* Tab content */}
        <div className="p-4">
            {activeTab === "description" && (
            <div>
                <p className="text-gray-700">{product.description}</p>
            </div>
            )}
            {activeTab === "details" && (
            <div className='mt-5 text-gray-700'>
                <h1 className='text-2xl font-bold mb-4'>Characteristics</h1>
                <table className='w-full text-left text-sm text-gray-600'>
                    <tbody>
                        <tr>
                            <td className='py-1'>Brand</td>
                            <td className='py-1'>{product.brand}</td>
                        </tr>
                        <tr>
                            <td className='py-1'>Material</td>
                            <td className='py-1'>{product.material}</td>
                        </tr>
                        <tr>
                            <td className='py-1'>Collections</td>
                            <td className='py-1'>{product.collections}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )}
            {activeTab === "reviews" && (
                <div>
                    <h2 className="text-xl font-bold">Customer Reviews</h2>
                    <p>{product.numReviews} reviews, average rating {product.rating}</p>
                    <div className="flex">
                        {[1,2,3,4,5].map((star) => (
                            <button 
                                key={star} 
                                type="button"
                                onClick={(e) => handleRate(star, e)}>
                            <FaStar className="text-gray-300 text-5xl cursor-pointer" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
});

export default ProductTabs;