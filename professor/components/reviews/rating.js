import Rating from 'react-rating';

export const StarRating = ({ rating, setRating }) => {
    return (
        <Rating
            initialRating={rating}
            emptySymbol={<i className="far fa-star text-yellow-400"></i>}
            fullSymbol={<i className="fas fa-star text-yellow-400"></i>}
            fractions={2}
            onChange= {(rate) => setRating(rate)}
        />
    );
}