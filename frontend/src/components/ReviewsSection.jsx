import React, { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";

const ReviewsSection = ({ productId }) => {
  const [reviews] = useState([
    {
      id: 1,
      author: "Rajesh Kumar",
      rating: 5,
      date: "2024-03-15",
      title: "Excellent quality product",
      comment:
        "Amazing build quality and fast charging. Works perfectly with my iPhone 14. Highly recommended!",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      author: "Priya Sharma",
      rating: 4,
      date: "2024-03-10",
      title: "Good value for money",
      comment:
        "Works as expected. Good build quality but charging could be slightly faster.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      author: "Amit Singh",
      rating: 5,
      date: "2024-03-05",
      title: "Perfect fit and finish",
      comment:
        "Fits my Samsung perfectly. LED indicator is very useful. Great purchase!",
      helpful: 6,
      verified: false,
    },
  ]);

  const [sortBy, setSortBy] = useState("newest");

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      (reviews.filter((review) => review.rating === rating).length /
        reviews.length) *
      100,
  }));

  return (
    <div className="space-y-8">
      {/* Reviews Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rating Summary */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>

          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {reviews.length} reviews
              </div>
            </div>

            <div className="flex-1 space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 w-2">{rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Write Review Button */}
        <div className="flex flex-col justify-center">
          <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">
              Share your experience
            </h4>
            <p className="text-gray-600 mb-4">
              Help others make informed decisions
            </p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-gray-900">
            All Reviews ({reviews.length})
          </h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  <h5 className="font-semibold text-gray-900 mb-2">
                    {review.title}
                  </h5>
                  <p className="text-gray-600 mb-3">{review.comment}</p>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 hover:text-gray-700">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-gray-700">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
