import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap'
import { updateUserEmail } from "../actions/userActions";
import { updateUserName } from "../actions/userActions";



export default function UserProfilescreen() {


    const dispatch = useDispatch()

    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate

   
    const [email, updateemail] = useState('')
    const [name, updatename] = useState('')

    if (currentUser.isAdmin === true) {
        console.log('Admin')

    }else{
        console.log('User')
    }

    function updateName(id) {

        
    

        const updatename = {

            name

        }

        console.log(updatename, id)
        dispatch(updateUserName(updatename, id))
    }

    function updateEmail(id) {

        const updateemail = {

            email

        }

        console.log(updateemail, id)
        dispatch(updateUserEmail(updateemail, id))
    }
    


 

    return (
        <div>

            <br />
            <br />
            <br />
            <br />
            <br />

            <h2 style={{ fontSize: '35px' }}>My Profile</h2>
            <br />



            <div class="modal fade" id="updatename" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">

                            <h1 class="modal-title fs-5" id="updatenameLabel">Update Name</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">


                            <form>



                                <div class="mb-3">

                                    <input

                                        required
                                        type="text"
                                        class="form-control"
                                        id="recipient-name"
                                        value={name}
                                        onChange={(e) => { updatename(e.target.value) }}

                                    />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn " data-bs-dismiss="modal">Close</button>
                            <button onClick={() => updateName(currentUser._id)} type="button" class="btn ">Update</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="modal fade" id="updateemail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="updateemailLabel">Update Email</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">

                                    <input

                                        required
                                        type="text"
                                        class="form-control"
                                        id="recipient-name"
                                        value={email}
                                        onChange={(e) => { updateemail(e.target.value) }}

                                    />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn " data-bs-dismiss="modal">Close</button>
                            <button onClick={() => updateEmail(currentUser._id)} type="button" class="btn ">Update</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='row justify-content-center'>

                <div className='col-md-8 m-2 p-1 shadow p-3 mb-5 bg-white rounded' style={{ backgroundColor: 'red', color: 'black' }}>

                    <img src='https://static.vecteezy.com/system/resources/previews/002/002/403/large_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' style={{ height: '150px', height: '150px' }} />



                    <div>
                        <h2 style={{ fontSize: '30px' }}>{currentUser.name} <i className="fa fa-edit" style={{ fontSize: '15px' }} type="button" data-bs-toggle="modal" data-bs-target="#updatename" data-bs-whatever="@mdo" ></i></h2>
                        <p>{currentUser.email} <i className="fa fa-edit" style={{ fontSize: '13px' }} type="button" data-bs-toggle="modal" data-bs-target="#updateemail" data-bs-whatever="@mdo" ></i></p>

                    </div>

                    <p>

                        {/* <a data-bs-toggle ="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fas fa-bell"></i>
                            <span class="badge rounded-pill badge-notification bg-danger">1</span>
                        </a> */}

                        <button className="btn" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Notifications <i class="fas fa-bell"></i>
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