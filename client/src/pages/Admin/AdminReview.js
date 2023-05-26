import React, { useState, useEffect } from 'react';
import { Rate, Input, Button } from 'antd';
import {Instanceaxios} from "../../Helpers/Instanceaxios";
import {message} from 'antd'
import {useSelector} from 'react-redux'

const Review = () => {
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const {user} = useSelector(state => state.users)
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {rating, userId: user._id}
    await Instanceaxios.post("/api/users/review", data).then((response) => {
        if (response.data.success) {
            message.success("Rating submitted successfully")
        }
    }).catch((error) => {
        console.log(error);
    });

}

useEffect(() => {
    const fetchReview = async () => {
        try{
            const res = await Instanceaxios.get(`/api/users/review`)
            // setRating(+res.data.data.rating)
            console.log(res.data.data.averageRating)
            setRating(+res.data.data.averageRating)
            setTotalRatings(res.data.data.reviews.length)
        }catch(err){
            console.log(err)
        }
    }
    fetchReview()
}, [])

  return (
    <div>
      <h2>Review</h2>
      <div>
        <label>Averate Rating:</label>
        <Rate value={rating} onChange={handleRatingChange} disabled  />
      </div>
      <div>
        <label>Total Ratings : {totalRatings}</label>
        <p>{}</p>
      </div>
    </div>
  );
};

export default Review;
