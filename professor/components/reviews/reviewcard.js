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

    return(
        <>
            <div>
                <h3>{review.course.name}</h3>
                
                <div>
                    <h1>Overall Rating</h1>
                    <StaticStarRating rating={review.Overallrating}/>
                </div>
                <div>
                    <h1>Difficulty</h1>
                    <StaticStarRating rating={review.Difficulty}/>
                </div>

                <div>
                    <h1>Workload</h1>
                    <StaticStarRating rating={review.Workload}/>
                </div>

                <div>
                    <h1>Lecture Quality</h1>
                    <StaticStarRating rating={review.Lecture}/>
                </div>

                <div>
                    <h1>Learning Value</h1>
                    <StaticStarRating rating={review.Learning}/>
                </div>
                 
                <p>{review.comment}</p>
            </div>
        </>
    )

}

export default ReviewCard;