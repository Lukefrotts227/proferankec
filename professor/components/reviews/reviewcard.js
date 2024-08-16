"use client"; 

import Rating from "react-rating";




const StaticStarRating = ({ rating }) => {

    return(
        <Rating
            initialRating={rating}
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
            fractions={2}
            readonly={true}/>
    )

}




const ReviewCard = ({ review }) => {
    console.log(review);
  
    return (
      <div className="bg-gray-200 shadow-lg rounded-lg p-6 mb-6 w-full">
        <h3 className="text-2xl font-bold mb-6">{review.course.name}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <h1 className="text-lg font-semibold">Overall Rating</h1>
            <StaticStarRating rating={review.overallRating} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Difficulty</h1>
            <StaticStarRating rating={review.difficulty} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Workload</h1>
            <StaticStarRating rating={review.workload} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Lecture Quality</h1>
            <StaticStarRating rating={review.lecture} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Learning Value</h1>
            <StaticStarRating rating={review.learning} />
          </div>
        </div>
        
        <p className="text-gray-700">{review.comment}</p>
      </div>
    );
  };
  
  
  

export default ReviewCard;