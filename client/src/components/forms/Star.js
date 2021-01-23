import React from 'react';
import StarRating from 'react-star-ratings';

export default function Star({ starClick, numberOfStars }) {
  return (
    <div>
      <StarRating
        numberOfStars={ numberOfStars }
        changeRating={ () => starClick(numberOfStars) }
        starDimention="20px"
        starSpacing="2px"
        starHoverColor='red'
        starEmptyColor='red'
      />
      <br />
    </div>
  )
}
