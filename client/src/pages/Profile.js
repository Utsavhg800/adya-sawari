import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Instanceaxios} from "../Helpers/Instanceaxios";
import axios from "axios";
import {message} from 'antd'


function Profile() {
    const {user} = useSelector(state => state.users)
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [name,setName] = useState("")

    useEffect(() => {
        setName(user.name)
    }, [])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const changePassword = async (event) => {
        event.preventDefault();

        if (inputs.password !== inputs.confirm_password) {
            setErrors({error: "Password and confirm password does not match."})
            return;
        }
        // set user id in inputs
        inputs.userId = user._id;

        await Instanceaxios.post("/api/users/change-password", inputs).then((response) => {
            if (response.data.success) {
                setInputs({})
                message.success("Password updated successfully")
            }
            setErrors({error: response.data.error})
        }).catch((error) => {
            console.log(error);
            setErrors({error: error.response.data.message})
        });

    }

    const updateName = async (event) => {
        event.preventDefault();

        const data = {name, userId: user._id}
        await Instanceaxios.post("/api/users/update-name", data).then((response) => {
            if (response.data.success) {
                setInputs({})
                message.success("Name updated successfully")
            }
            setErrors({error: response.data.error})
        }).catch((error) => {
            console.log(error);
            setErrors({error: error.response.data.message})
        });

    }

    return (
        <div>
            <div className="my-3 py-1">
                <h1>My Profile</h1>
                <hr/>
                <form className="d-flex gap-3 align-items-center mb-2">
                <h2 >Name:</h2>
                <input type="" value={name} onChange={(e) => {
                    setName(e.target.value)
                }}
                style={{
                    width: '15rem'
                }}
                />
                <button onClick={updateName}>Update</button>

                </form>
                <h2>Email: {user.email}</h2>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h1>Change Password</h1>
                    <hr/>
                    {errors.error && <div className="alert alert-danger">{errors.error}</div>}
                </div>
                <div className="col-md-12">
                    <form action="" onSubmit={changePassword}>
                        <div className="form-group">
                            <label htmlFor="old_password">Old Password</label>
                            <input type="password" name="old_password"
                                   value={inputs.old_password || ""}
                                   onChange={handleChange}
                                   className="form-control" id="old_password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="new_password">New Password</label>
                            <input type="password" className="form-control"
                                   name="password"
                                   value={inputs.password || ""}
                                   onChange={handleChange}
                                   id="new_password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password"
                                   name="confirm_password"

                                   value={inputs.confirm_password || ""}
                                   onChange={handleChange}
                                   className="form-control" id="confirm_password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Profile