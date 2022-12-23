import React from "react"
import { useSelector, useDispatch } from 'react-redux'

export default function UserProfilescreen() {

    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const dispatch = useDispatch()

    return (
        <div>

            <h2 style={{ fontSize: '35px' }}>My Profile</h2>
            <br/>
            <div className='row justify-content-center'>

               <div className='col-md-8 m-2 p-1 shadow p-3 mb-5 bg-white rounded' style={{ backgroundColor: 'red', color: 'black' }}>
                    
               <img src='https://static.vecteezy.com/system/resources/previews/002/002/403/large_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' style={{ height: '150px', height: '150px' }} />
                    


               <div>
                <h2 style={{ fontSize: '30px' }}>{currentUser.name} <i className="fa fa-edit" style={{ fontSize: '15px' }} ></i></h2>
                <p>{currentUser.email} <i className="fa fa-edit" style={{ fontSize: '13px' }} ></i></p>
                
                </div>
                </div>
               

            </div>


        </div>
    )
}