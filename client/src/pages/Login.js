import React from 'react'
import { Form, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
function Login() {
  
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values.email, values.password)
    try {
      if(!values.email && !values.pasword){
        message.error("Fields are empty")
      }else{
        dispatch(ShowLoading());
        const response = await axios.post("/api/users/login", values);
        dispatch(HideLoading());
        if (response.data.success) {
          message.success(response.data.message)
          localStorage.setItem("token", response.data.data);
          window.location.href = "/";
        } else {
          message.error(response.data.message)
        }

      }

    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message)
 
    }
  }

  return (
    <div className='screenHeight d-flex justify-content-center align-items-center bimg'>
      <div className='custom-card-form'>
        <h1 className='para-md'><i className="bi bi-bus-front"></i> Login to System</h1>
        <hr />
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item label='Email' name='email'>
            <input type="text" />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <input type="password" />
          </Form.Item>
          <div className='d-flex justify-content-between align-items-center'>
            <button className='auth-button'>
              <i className="bi bi-unlock"></i> Login</button>
            <Link to="/register">Click Here To Register</Link>
          </div>
        </Form>
        <hr/>
        <Link to="/forgot-password">Forgot Password?</Link>

      </div>
    </div>
  )
}

export default Login