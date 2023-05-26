import React from 'react';
import axios from "axios";
import { message } from 'antd';


function ForgotPassword() {
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState('')


    const resetPassword = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/users/password-reset', {email})
            if(response.data.success){
                console.log(response.data.message)
                message.success("Check your mail")
                setEmail("")
            }else{
                setError(response.data.error)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='screenHeight d-flex justify-content-center align-items-center bimg'>
            <div className='custom-card-form'>
                <h1 className='para-md'><i className="bi bi-bus-front"></i> Forgot Password</h1>
                <hr/>
                <form action="" onSubmit={resetPassword}>
                    <div className="form-group">
                        <label htmlFor="email">Email:
                            {error.email && <span className='text-danger'> {error.email}</span>}
                        </label>
                        <input type="text"
                        value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               className="form-control" required id="email"/>
                    </div>
                    <div className="form-group">
                        <button className='login-button'>
                            <i className="bi bi-unlock"></i> Send Email
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword