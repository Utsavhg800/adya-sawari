import React, {useState} from 'react';
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import { message } from 'antd';


function PasswordResetConfirm() {
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const params = useParams();


    const resetPassword = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError({password: 'Passwords do not match'})
        }

        let sendData = {
            password,
            token: params.id
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/password-reset-confirm', sendData)
            // alert(response.data.success)
            message.success("Password reset successfully")
            
            setTimeout(() => {
                // navigate.navigate("/login")
                window.location.href = "/login"
            }, [2000])
        } catch (error) {
            console.log(error)
            message.error(error.message)
        }
    }


    return (
        <div className='screenHeight d-flex justify-content-center align-items-center bimg'>
            <div className='custom-card-form'>
                <h1 className='para-md'><i className="bi bi-bus-front"></i> Forgot Password</h1>
                <hr/>
                <form action="" onSubmit={resetPassword}>
                    <div className="form-group">
                        <label htmlFor="password">Password:
                            {error.password && <span className='text-danger'> {error.password}</span>}
                        </label>
                        <input type="password"
                               onChange={(e) => setPassword(e.target.value)}
                               className="form-control" required id="password"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm_password">Confirm Password:
                        </label>
                        <input type="password"
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               className="form-control" required id="confirm_password"/>
                    </div>
                    <div className="form-group">
                        <button className='login-button'>
                            <i className="bi bi-unlock"></i> Reset Password
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default PasswordResetConfirm