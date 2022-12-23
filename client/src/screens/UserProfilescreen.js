import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap'

export default function UserProfilescreen() {

    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const dispatch = useDispatch()

    return (
        <div>

            <h2 style={{ fontSize: '35px' }}>My Profile</h2>
            <br />
            <div className='row justify-content-center'>

                <div className='col-md-8 m-2 p-1 shadow p-3 mb-5 bg-white rounded' style={{ backgroundColor: 'red', color: 'black' }}>

                    <img src='https://static.vecteezy.com/system/resources/previews/002/002/403/large_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' style={{ height: '150px', height: '150px' }} />



                    <div>
                        <h2 style={{ fontSize: '30px' }}>{currentUser.name} <i className="fa fa-edit" style={{ fontSize: '15px' }} ></i></h2>
                        <p>{currentUser.email} <i className="fa fa-edit" style={{ fontSize: '13px' }} ></i></p>

                    </div>

                    <p>

                        {/* <a data-bs-toggle ="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fas fa-bell"></i>
                            <span class="badge rounded-pill badge-notification bg-danger">1</span>
                        </a> */}

                        <button className="btn" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Notification
                        </button>
                    </p>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            Welcome Back ! {currentUser.name}
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
}