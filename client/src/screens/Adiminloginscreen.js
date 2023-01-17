import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin } from "../actions/adminActions"
import { setNotification } from "../actions/notificationAction";
import Error from "../components/Error";
import Loading from "../components/Loading";



export default function Adminloginscreen() {


    const [AdminEmail, setemail] = useState('')
    const [AdminPassword, setpassword] = useState('')
    const adminloginstate = useSelector(state => state.adminloginReducer)
    const { loading, error } = adminloginstate
    const dispatch = useDispatch()


    useEffect(() => {

        if (localStorage.getItem('currentAdmin')) {
            window.location.href = '/admin'
        }
    })


    function login() {

        const admin = { AdminEmail,AdminPassword }
        dispatch(loginAdmin(admin))
        dispatch(setNotification())
    }


    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='row justify-content-center'>
                <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">
                    <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Admin Login</h2>

                    {loading && (<Loading />)}
                    {error && (<Error error='Invalid Credentials' />)}


                    <div>

                        <input

                            required
                            type="email"
                            placeholder="email"
                            className="form-control"
                            value={AdminEmail}
                            onChange={(e) => { setemail(e.target.value) }}

                        />
                        <input

                            required
                            type="password"
                            placeholder="password"
                            className="form-control"
                            value={AdminPassword}
                            onChange={(e) => { setpassword(e.target.value) }}

                        />


                        <button onClick={login} className="btn mt-3 mb-3 " >LOGIN</button>
                        <br />
                        <a style={{ color: 'black' }} className='text-start' href="/register">Click Here To Register</a>
                    </div>

                </div>

            </div>
            <br />

        </div>
    )
}