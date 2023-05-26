import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, message, Row } from 'antd';
import { Instanceaxios } from '../Helpers/Instanceaxios';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import SelectionSeat from '../components/SelectionSeat';
import axios from "axios";


function BookTicket() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { user } = useSelector(state => state.users);
    const params = useParams();
    const dispatch = useDispatch();
    const [bus, setBus] = useState(null);

    const getBus = async () => {
        try {
            dispatch(ShowLoading());
            const response = await Instanceaxios.post("/api/buses/get-bus-by-id", {
                _id: params.id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                setBus(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const bookNow = async () => {
        let price = bus.price * selectedSeats.length * 100;

        const data = {
            return_url: "http://localhost:3000",
            website_url: "http://localhost:3000",
            amount: 1000,
            purchase_order_id: "test123",
            purchase_order_name: "test",
        };
        try {
            const response = await Instanceaxios.post("/api/bookings/book-seat", {
                bus: bus._id,
                seats: selectedSeats,
                userId: user._id,
            });
            if (response.data.success) {
                axios.post('https://a.khalti.com/api/v2/epayment/initiate/', data, {
                    headers: {
                        'Authorization': 'Key 799d17e01c6e4399b81b884833819810',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        const paymentURL = response.data.payment_url;
                        window.location.replace(paymentURL);
                    })
                    .catch(error => {
                        console.log(error);
                    });

                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getBus();
    }, []);


    return (
        <div>
            {bus && (
                <div>
                    <Row className='mt-3' gutter={20}>
                        <Col lg={12} xs={24} sm={24}>
                            <h1 className='para-lg text-primary'>{bus.name}</h1>
                            <h1 className='para-sm'>{bus.from} - {bus.to}</h1>
                            <hr />
                            <div className='flex flex-col gap-3'>
                                <h1 className='para-md'>Journey Date: {bus.journeyDate}</h1>
                                <h1 className='para-md'>Price: Rs.{bus.price} /-</h1>
                                <h1 className='para-md'>Departure TIme: {bus.departureTime}</h1>
                                <h1 className='para-md'>Arrival Time: {bus.arrivalTime}</h1>
                                <h1 className='para-md'>Capacity: {bus.capacity}</h1>
                                <h1 className='para-md'>Seats Left: {bus.capacity - bus.bookedSeats.length}</h1>
                            </div>
                            <hr />

                            <div className='flex flex-col gap-1 '>
                                <h1 className='text-md mt-2'>
                                    Selected Seats : {selectedSeats.join(", ")}
                                </h1>
                                <h1 className='text-md'>Ticket Price: Rs. {bus.price * selectedSeats.length}</h1>

                                <button className={`login-button mt-3 ${selectedSeats.length === 0 && "login-button"
                                    }`}
                                    onClick={bookNow}

                                    disabled={selectedSeats.length === 0}>
                                    Book Now Via Khalti
                                </button>
                            </div>

                        </Col>
                        <Col lg={12} xs={24} sm={24}>
                            <SelectionSeat
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                bus={bus}
                            />
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default BookTicket;
