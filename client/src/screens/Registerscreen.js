import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from "../actions/userActions"
import Loading from "../components/Loading"
import Success from "../components/Success"
import Error from "../components/Error"


export default function Registerscreen() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const registerstate = useSelector(state => state.registerUserReducer)
    const { error, loading, success } = registerstate


    const dispatch = useDispatch()
    function register() {

        if (password != cpassword) {

            alert("passwords not matched")

        } else {

            const user = {

                name,
                email,
                password
               
            }
            console.log(user)
            dispatch(registerUser(user))
        }
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
              
                    {loading && <Loading />}
                    {success && <Success success='User Registered Successfully' />}
                    {error && (<Error error='Email already registered' />)}


                    <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Register</h2>
                    <div>
                        
                      

                        <input

                            required
                            type="text"
                            placeholder="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => { setname(e.target.value) }}

                        />
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
                        <input

                            required
                            type="password"
                            placeholder="confirm password"
                            className="form-control"
                            value={cpassword}
                            onChange={(e) => { setcpassword(e.target.value) }}

                        />
                        <button onClick={register} className="btn mt-3 mb-3" >REGISTER</button>
                       
                       

                        
                        <br />
                        <a style={{ color: 'black' }} className='text-start' href="/login">Click Here To Login</a>
                    </div>
                   
                </div>

            </div>
            <br />
        </div>
    )
}