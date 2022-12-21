import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from "../actions/userActions"
export default function Loginscreen() {


    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const dispatch = useDispatch()


    useEffect(() => {

        if (localStorage.getItem('currentUser')) {
            window.location.href = '/'
        }
    })


    function login() {

        const user = { email, password }
        dispatch(loginUser(user))
    }


    return (

        <div>
            <div className='row justify-content-center'>
                <div className="col-md-5 text-start">
                    <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Login</h2>
                    <div>


                        <input

                            required
                            type="email"
                            placeholder="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => { setemail(e.target.value) }}

                        />
                        <input

                            required
                            type="password"
                            placeholder="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => { setpassword(e.target.value) }}

                        />


                        <button onClick={login} className="btn mt-3" >LOGIN</button>
                    </div>

                </div>

            </div>
        </div>
    )
}