import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { getReviews } from "../../services/api"; 
import { toast } from "react-toastify";

const ReviewList = ({ productId, currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getReviews(productId);
      console.log("reviews from API:", response);

      let allReviews = response.data || [];

      // ✅ Move logged-in user's review to the top
      if (currentUser) {
        const myReview = allReviews.find(
          (review) => review.user?._id === currentUser._id
        );
        const otherReviews = allReviews.filter(
          (review) => review.user?._id !== currentUser._id
        );

        // Set reviews with my review on top
        setReviews(myReview ? [myReview, ...otherReviews] : allReviews);
      } else {
        setReviews(allReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading reviews...</p>;
  }

  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => {
        const isMyReview = currentUser && review.user?._id === currentUser._id;

        return (
          <div
            key={review._id}
            className={`p-4 border rounded-lg shadow-sm ${
              isMyReview ? "bg-blue-50 border-blue-300" : "bg-gray-50"
            }`}
          >
            {/* User + Date */}
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">
                {review.user?.name || "Anonymous"}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {review.rating}/5
              </span>
            </div>

            {/* Comment */}
            <p className="text-gray-700 mb-3">{review.comment}</p>

            {/* Images */}
            {review.images?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {review.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="w-24 h-24 rounded-lg overflow-hidden border shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`review-img-${imgIdx}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Edit Button if my review */}
            {isMyReview && (
              <button
                onClick={() => toast.info("Edit review coming soon!")}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Review
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
