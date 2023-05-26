import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Col, message, Row} from 'antd';
import {Instanceaxios} from '../Helpers/Instanceaxios';
import {Link} from "react-router-dom";


function Bookings() {
    const {user} = useSelector(state => state.users);
    const [bookings, setBookings] = useState([]);
    const getBus = async () => {
        try {
            await Instanceaxios.post("/api/bookings/bookings", {
                userId: user._id,
            }).then((response) => {
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
                    <h1>My Booking List</h1>

                    {bookings.length === 0 && <h1>No Bookings</h1>}
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">S.n</th>
                            <th scope="col">Bus Name</th>
                            <th scope="col">Bus Number</th>
                            <th scope="col">Book Seats</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{booking.bus.name}</td>
                                <td>{booking.bus.number}</td>
                                <td>{booking.seats.join(", ")}</td>
                                <td>{booking.bus.from}</td>
                                <td>{booking.bus.to}</td>
                                <td>{booking.bus.journeyDate}</td>
                                <td>
                                    <Link to={booking.pdfTicket} target="_blank"><u>Print & Download Ticket</u></Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </Row>
            </div>
        </React.Fragment>
    );
}

export default Bookings;
