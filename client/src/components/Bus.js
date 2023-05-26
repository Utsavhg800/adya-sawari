import React from 'react'
import {useNavigate} from 'react-router-dom'

function Bus({bus}) {
    const navigate = useNavigate();
    return (
        <div className='card p-4 but-box-style'>
            <h1 className='para-lg'>{bus.name}</h1>
            <hr/>
            <div className='d-flex justify-content-between'>
                <div>
                    <p className='para-sm'>From</p>
                    <p className='para-sm'>{bus.from}</p>
                </div>
                <div>
                    <p className='para-sm'>To</p>
                    <p className='para-sm'>{bus.to}</p>
                </div>
                <div>
                    <p className='para-sm'>Price</p>
                    <p className='para-sm'>Rs. {bus.price} /-</p>
                </div>
            </div>

            <div className='d-flex justify-content-between align-items-end'>
                <div>
                    <p className='para-sm'>Journey Date</p>
                    <p className='para-sm'> {bus.journeyDate}</p>
                </div>

                <button className='btn btn-primary' onClick={() => {
                    navigate(`/book-now/${bus._id}`)
                }}>Click To Book</button>

            </div>

        </div>
    )
}

export default Bus