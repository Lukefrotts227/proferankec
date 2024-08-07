import Rating from "react-rating";

const StarRating = ({ rating, onRatingChange }) => 
{
    return (
        <Rating
            initialRating={rating}
            emptySymbol="far fa-star"
            fullSymbol="fas fa-star"
            fractions={2}
            onChange={onRatingChange}
        />
    );

}

export default StarRating;