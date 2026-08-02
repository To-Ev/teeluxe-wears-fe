import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductReview } from "../../redux/slices/productsSlice";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const ProductTabs = React.memo(({ product, loading }) => {
    const [activeTab, setActiveTab] = useState("details");
    const dispatch = useDispatch();

    const [rating, setRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);

    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // const skeletonWidths = useMemo(
    //     () => [5,4,3,2,1].map(() => `${Math.floor(Math.random() * 80 + 20)}%`),
    //     []
    // );

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

        setSelectedRating(newRating);

        dispatch(addProductReview({
            id: product._id,
            rating: newRating,
            comment: "Loved it!"
        }))
        .unwrap()
        .then(() => toast.success("Review submitted"))
        .catch(err => {
            setSelectedRating(0); // rollback if error
            toast.error(typeof err === "string" ? err : "Failed to add review");
        });

    };

  return (
    <div className="w-full">
      {/* Tab buttons */}
        <div className="flex my-10 gap-6 justify-center text-gray-700 text-md font-semibold w-full">
            <button
            className={`px-4 py-2 cursor-pointer ${activeTab === "description" ? "border-b-2 border-gray-500 text-lg sm:text-xl" : "text-gray-500"}`}
            onClick={() => setActiveTab("description")}
            >
            Product Details
            </button>
            <button
            className={`px-4 py-2 cursor-pointer ${activeTab === "details" ? "border-b-2 border-gray-500 text-lg sm:text-xl" : "text-gray-500"}`}
            onClick={() => setActiveTab("details")}
            >
            Additional Information
            </button>
            <button
            className={`px-4 py-2 cursor-pointer ${activeTab === "reviews" ? "border-b-2 border-gray-500 text-lg sm:text-xl" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
            >
            Reviews
            </button>
        </div>

      {/* Tab content */}
        <div className="p-4">
            {activeTab === "description" && (
            <div className="flex gap-20 text-gray-700">
                <div>
                    <h1 className="text-xl font-semibold mb-4">Description</h1>
                    <p className="text-gray-700">{product.description}</p>
                </div>
            </div>
            )}
            {activeTab === "details" && (
            <div className='text-gray-700'>
                <table className='w-full text-left text-sm text-gray-600'>
                    <thead className=' bg-gray-100 text-xs uppercase'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>Feature</th>
                            <th className='py-2 px-4 sm:py-3'>Description</th>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700'>
                        <tr>
                            <td className='py-3 pl-4 text-gray-700'>Brand</td>
                            <td className='py-3 pl-4'>{product.brand}</td>
                        </tr>
                        <tr>
                            <td className='py-3 pl-4'>Material</td>
                            <td className='py-3 pl-4'>{product.material}</td>
                        </tr>
                        <tr>
                            <td className='py-3 pl-4'>Sizes</td>
                            <td className='py-3 pl-4'>{product.sizes.join(", ")}</td>
                        </tr>
                        <tr>
                            <td className='py-3 pl-4'>Colors</td>
                            <td className='py-3 pl-4'>{product.colors.join(", ")}</td>
                        </tr>
                        <tr>
                            <td className='py-3 pl-4'>Collections</td>
                            <td className='py-3 pl-4'>{product.collections}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )}
            {activeTab === "reviews" && (
            <div className="w-full flex items-center justify-between sm:flex-row flex-col">
                {/* Left: overall rating and stars */}
                <div className="w-1/3 flex flex-col mb-6 items-center">
                    <div className="flex gap-2 items-end">
                        <p className="text-4xl font-semibold text-gray-700">{product.rating}</p>
                        <p className="text-gray-700">out of 5</p>
                    </div>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={(e) => handleRate(star, e)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <FaStar
                            className={`text-5xl cursor-pointer ${
                                star <= (hoverRating || selectedRating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            />
                        </button>
                        ))}
                    </div>
                    <p className="text-gray-700 mt-3">({product.numReviews} reviews)</p>
                </div>

                {/* Right: skeleton rows or actual distribution */}
                <div className="w-2/3 space-y-3">
                {loading ? (
                    // Skeleton rows
                    [5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex justify-center items-center gap-10">
                        <span className="text-sm text-gray-500">{star} star</span>
                        <div className="w-3/5 bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-gray-400 h-2 rounded-full animate-pulse"
                            style={{ width: "60%" }}
                        ></div>
                        </div>
                    </div>
                    ))
                ) : (
                    // Actual distribution
                    [5, 4, 3, 2, 1].map((star) => {
                    const count = product.reviews.filter((r) => r.rating === star).length;
                    const percentage =
                        product.numReviews > 0
                        ? (count / product.numReviews) * 100
                        : 0;
                    return (
                        <div key={star} className="flex justify-center items-center gap-10">
                        <span className="text-sm text-gray-500">{star} star</span>
                        <div className="w-3/5 bg-gray-200 rounded-full h-2">
                            <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500">{count}</span>
                        </div>
                    );
                    })
                )}
                </div>
            </div>
            )}
        </div>
    </div>
  );
});

export default ProductTabs;