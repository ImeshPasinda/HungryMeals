import React from 'react'
import { useState, useEffect } from "react";
//import {useDispatch , useSelector} from 'react-redux'

function Registerscreen() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')

function register(){

    if(password !== cpassword){
        alert("password not matched")
    }else {

        const user = {

            name,
            email,
            password
        }
        console.log(user)
        
    }
}













  return (
    <div>
        <div className='form-container'>

            <div className='col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded'>
                <div>
                <h2 className="text-center m-4" style={{ fontSize: '35px' }}>Register</h2>
                    <input required type="text" placeholder='name'className='form-control' value={name}
                            onChange={(e) => { setname(e.target.value)} }/>
                    <input required type="text" placeholder='email'className='form-control' value={email}
                            onChange={(e) => { setemail(e.target.value) }}/>
                    <input required type="text" placeholder='Password'className='form-control'  value={password}
                            onChange={(e) => { setpassword(e.target.value) }}/>
                    <input required type="text" placeholder='Confirm Password'className='form-control'  value={cpassword}
                            onChange={(e) => { setcpassword(e.target.value) }}/>

                    <button  className="btn mt-3 mb-3" onClick={register}>REGISTER</button>
                        <br/>
                    

                </div>
            </div>
        </div>

    </div>
  )
}

export default Registerscreen
