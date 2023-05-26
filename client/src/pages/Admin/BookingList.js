import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Col, message, Row} from 'antd';
import {Instanceaxios} from '../../Helpers/Instanceaxios';


function BookingList() {
    const {user} = useSelector(state => state.users);
    const [bookings, setBookings] = useState([]);
    const getBus = async () => {
        try {
            await Instanceaxios.get("/api/bookings/bookings-list").then((response) => {
                console.log(response);
                setBookings(response.data.data);
            }).catch((error) => {
                console.log(error);
            });

        } catch (error) {
            console.log(error);
        }

    };


    useEffect(() => {
        getBus();

    }, []);


    return (
        <React.Fragment>
            <div>
                <Row className='mt-3' gutter={20}>
                    <div>
                        <h1>Booking Lists</h1>
                    </div>

                    {bookings.length === 0 && <div><h1>No Bookings</h1></div>}
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">S.n</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Bus Name</th>
                            <th scope="col">Bus Number</th>
                            <th scope="col">Booked Seats</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{booking.userId.name}</td>
                                <td>{booking.bus.name}</td>
                                <td>{booking.bus.number}</td>
                                <td>{booking.seats.join(", ")}</td>
                                <td>{booking.bus.from}</td>
                                <td>{booking.bus.to}</td>
                                <td>{booking.bus.journeyDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </Row>
            </div>
        </React.Fragment>
    );
}

export default BookingList;
