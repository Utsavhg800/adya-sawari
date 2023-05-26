import React from 'react'
import {Form, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from "axios";
import {useDispatch} from 'react-redux';
import {HideLoading, ShowLoading} from '../redux/alertsSlice';
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/users/register", values);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message)
                navigate("/login");
            } else {
                message.error(response.data.message)
            }

        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)

        }
    }

    return (
        <div className='screenHeight d-flex justify-content-center align-items-center bimg'>
            <div className='custom-card-form'>
                <h1 className='para-md'><i className="bi bi-bag-plus-fill"></i> Register for New Account</h1>
                <hr/>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name'>
                        <input type="text"/>
                    </Form.Item>

                    <Form.Item label='Email' name='email' >
                        <input type="email"/>
                    </Form.Item>

                    <Form.Item label='Password' name='password'>
                        <input type="password"/>
                    </Form.Item>
                    <div className='d-flex justify-content-between align-items-center'>
                        <button className='auth-button' type='submit'><i className="bi bi-bag-plus-fill"></i> Register</button>
                        <Link to="/login"><i className="bi bi-unlock"></i> Click Here To Login</Link> 
                    </div>
                </Form>

            </div>
        </div>
    )
}

export default Register;