import React, { useState, useEffect } from 'react';
import { Rate, Input, Button } from 'antd';
import {Instanceaxios} from "../Helpers/Instanceaxios";
import {message} from 'antd'
import {useSelector} from 'react-redux'

const Review = () => {
  const [rating, setRating] = useState(0);

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
            const res = await Instanceaxios.get(`/api/users/review/${user._id}`)
            setRating(+res.data.data.rating)
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
        <label>Rating:</label>
        <Rate value={rating} onChange={handleRatingChange} />
      </div>
      
      <Button type="primary" className="mt-3" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Review;
