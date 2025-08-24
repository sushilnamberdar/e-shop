// src/pages/ReviewForm.js
import React, { useState } from "react";
import { addReview } from "../../services/api";
import { toast } from "react-toastify";

function ReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Convert a file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      alert("⚠️ You can upload a maximum of 5 images.");
      return;
    }
    setImages(selectedFiles);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Convert all images to base64
      const base64Images = await Promise.all(
        images.map(file => fileToBase64(file))
      );

      // Prepare payload
      const payload = {
        rating,
        comment,
        images: base64Images
      };

      // Send to backend
      const res = await addReview(productId, payload);
      setMessage("✅ Review submitted successfully!");
      toast.success("✅ Review submitted successfully!");
      console.log("Response:", res.data);
      // Clear form
      setRating(5);
      setComment("");
      setImages([]);
    } catch (err) {
      setMessage("❌ Failed to submit review");
      console.error("error console", err.response?.data || err.message);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("images selected", images)

  return (
    <div className="w-full mx-auto mt-10 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
        Add Your Review
      </h2>

      {message && (
        <p
          className={`text-center mb-4 font-semibold ${message.includes("❌") ? "text-red-500" : "text-green-500"
            }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className=" space-y-6">
        {/* Rating */}
        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 text-lg">Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl cursor-pointer transition-transform duration-200 ${star <= rating ? "text-yellow-400 scale-110" : "text-gray-300"
                  }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="font-semibold text-gray-700 text-lg">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows="4"
            placeholder="Share your experience..."
            className="mt-2 w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm resize-none bg-white placeholder-gray-400"
          />
        </div>

        {/* Images */}
        <div>



          <label className="font-semibold text-gray-700 text-lg">Upload Images (max 5):</label>

          {/* selected images  */}
          <div className="flex">
            {images.map((file, idx) => (
              <div
                key={idx}
                className="w-24 h-24 rounded-lg overflow-hidden shadow-md border"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 w-full text-gray-700 cursor-pointer rounded-lg border border-gray-200 px-3 py-2 shadow-sm hover:bg-gray-50 transition"
          />
        </div>




        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-2xl font-bold text-white text-lg transition-all duration-300 ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-600 hover:scale-105"
            }`}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>

  );
}

export default ReviewForm;
