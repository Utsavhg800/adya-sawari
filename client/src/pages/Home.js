import React from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {Col, message, Row} from 'antd';
import Bus from '../components/Bus';
import axios from 'axios';

function Home() {
    const {user} = useSelector(state => state.users)
    const [filters = {}, setFilters] = useState({});
    const [buses, setBuses] = useState([]);
    const getBuses = async () => {
        const tempFilters = {}
        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                tempFilters[key] = filters[key];
            }
        });
        try {
            const response = await axios.post("/api/buses/display-buses",
                tempFilters,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
            if (response.data.success) {
                setBuses(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };
    useEffect(() => {
        getBuses();
    }, []);

    let clearFilters = () => {
        getBuses();
        setFilters({
            from: "",
            to: "",
            journeyDate: "",
        });

    }


    return (
        <div>
            <div className="my-3 py-1">
                <Row gutter={10} align="center">
                    <Col lg={6} sm={24}>
                        <input
                            type="text"
                            placeholder="From"
                            value={filters.from}
                            onChange={(e) => setFilters({...filters, from: e.target.value})}
                        />
                    </Col>

                    <Col lg={6} sm={24}>
                        <input
                            type="text"
                            placeholder="To"
                            value={filters.to}
                            onChange={(e) => setFilters({...filters, to: e.target.value})}
                        />
                    </Col>

                    <Col lg={6} sm={24}>
                        <input
                            type="date"
                            placeholder="Date"
                            value={filters.journeyDate}
                            onChange={(e) =>
                                setFilters({...filters, journeyDate: e.target.value})
                            }
                        />
                    </Col>

                    <Col lg={6} sm={24}>
                        <button className='btn btn-primary' onClick={() => getBuses()}>
                            Filter
                        </button>
                        <button
                            onClick={() => clearFilters()}
                            className="btn btn-danger">Clear
                        </button>
                    </Col>
                </Row>
            </div>
            <div>
                <Row gutter={[18, 18]}>
                    {buses.length === 0 && <h1>No Buses Found</h1>}
                    {buses.filter(bus => bus.busStatus === 'Yet To Start').map(bus => (
                        <Col lg={12} xs={24} sm={24}>
                            <Bus bus={bus}/>
                        </Col>
                    ))}


                </Row>
            </div>
        </div>
    )
}

export default Home