import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap'
import axios from 'axios'
import { updateUserEmail } from "../actions/userActions";
import { updateUserName } from "../actions/userActions";
import { updateNotificationOneAction } from "../actions/userActions";
import { updateNotificationTwoAction } from "../actions/userActions";
import { updateNotificationThreeAction } from "../actions/userActions";
import { updateNotificationFourAction } from "../actions/userActions";


var isVerified;


var NotificationOneImage
var NotificationOneHeader
var NotificationOneBody
var NotificationOneDate


var NotificationTwoImage
var NotificationTwoHeader
var NotificationTwoBody
var NotificationTwoDate


var NotificationThreeImage
var NotificationThreeHeader
var NotificationThreeBody
var NotificationThreeDate


var NotificationFourImage
var NotificationFourHeader
var NotificationFourBody
var NotificationFourDate


var NotificationType
var NotificationHeader
var NotificationBody
var NotificationButton
var NotificationDate

export default function UserProfilescreen() {


    const dispatch = useDispatch()

    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser, currentNotifications } = userstate
    const [currentusers, setUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);



    useEffect(() => {




        function getCurrentUser() {

            axios.get(`http://localhost:8070/api/users/getcurrentuser/${currentUser._id}`).then((res) => {


                setUsers(res.data);


                isVerified = res.data.isVerified


                NotificationOneImage = res.data.notificationOneImage
                NotificationOneHeader = res.data.notificationOneHeader
                NotificationOneBody = res.data.notificationOneBody
                NotificationOneDate = res.data.notificationOneDate


                NotificationTwoImage = res.data.notificationTwoImage
                NotificationTwoHeader = res.data.notificationTwoHeader
                NotificationTwoBody = res.data.notificationTwoBody
                NotificationTwoDate = res.data.notificationTwoDate


                NotificationThreeImage = res.data.notificationThreeImage
                NotificationThreeHeader = res.data.notificationThreeHeader
                NotificationThreeBody = res.data.notificationThreeBody
                NotificationThreeDate = res.data.notificationThreeDate


                NotificationFourImage = res.data.notificationFourImage
                NotificationFourHeader = res.data.notificationFourHeader
                NotificationFourBody = res.data.notificationFourBody
                NotificationFourDate = res.data.notificationFourDate








            }).catch((error) => {
                console.log(error)


            })
        }
        getCurrentUser();

    }, [])



    useEffect(() => {




        function getPublicNotifications() {

            axios.get('http://localhost:8070/api/notifications/getnotifications').then((res) => {


                setNotifications(res.data);





                NotificationType = res.data[0].notificationType
                NotificationHeader = res.data[0].notificationHeader
                NotificationBody = res.data[0].notificationBody
                NotificationButton = res.data[0].notificationButton
                NotificationDate = res.data[0].notificationDate






            }).catch((error) => {
                console.log(error)


            })
        }
        getPublicNotifications();

    }, [])









    const [email, updateemail] = useState('')
    const [name, updatename] = useState('')



    function updateName(id) {




        const updatename = {

            name

        }

        console.log(updatename, id)
        dispatch(updateUserName(updatename, id))


        currentUser.name = name;
        localStorage.setItem('currentUser', JSON.stringify(currentUser))

    }

    function updateEmail(id) {

        const updateemail = {

            email

        }

        console.log(updateemail, id)
        dispatch(updateUserEmail(updateemail, id))

        currentUser.email = email;
        localStorage.setItem('currentUser', JSON.stringify(currentUser))

    }

    const [notificationOneImage, updatenotiOneImage] = useState('')
    const [notificationOneHeader, updatenotiOneHeader] = useState('')
    const [notificationOneBody, updatenotiOneBody] = useState('')
    const [notificationOneDate, updatenotiOneDate] = useState('')

    function updateNotificationOne(userId, val) {


        console.log(userId, val)

        const updateNotificationOne = {

            notificationOneImage,
            notificationOneHeader: val,
            notificationOneBody,
            notificationOneDate

        }

        console.log(updateNotificationOne, userId)
        dispatch(updateNotificationOneAction(updateNotificationOne, userId))

        currentUser.notificationOneHeader = 'empty';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))




    }


    const [notificationTwoImage, updatenotiTwoImage] = useState('')
    const [notificationTwoHeader, updatenotiTwoHeader] = useState('')
    const [notificationTwoBody, updatenotiTwoBody] = useState('')
    const [notificationTwoDate, updatenotiTwoDate] = useState('')

    function updateNotificationTwo(userId, val) {


        console.log(userId, val)

        const updateNotificationTwo = {

            notificationTwoImage,
            notificationTwoHeader: val,
            notificationTwoBody,
            notificationTwoDate

        }

        console.log(updateNotificationTwo, userId)
        dispatch(updateNotificationTwoAction(updateNotificationTwo, userId))

        currentUser.notificationTwoHeader = 'empty';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))




    }

    const [notificationThreeImage, updatenotiThreeImage] = useState('')
    const [notificationThreeHeader, updatenotiThreeHeader] = useState('')
    const [notificationThreeBody, updatenotiThreeBody] = useState('')
    const [notificationThreeDate, updatenotiThreeDate] = useState('')

    function updateNotificationThree(userId, val) {


        console.log(userId, val)

        const updateNotificationThree = {

            notificationThreeImage,
            notificationThreeHeader: val,
            notificationThreeBody,
            notificationThreeDate

        }

        console.log(updateNotificationThree, userId)
        dispatch(updateNotificationThreeAction(updateNotificationThree, userId))

        currentUser.notificationThreeHeader = 'empty';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))




    }

    const [notificationFourImage, updatenotiFourImage] = useState('')
    const [notificationFourHeader, updatenotiFourHeader] = useState('')
    const [notificationFourBody, updatenotiFourBody] = useState('')
    const [notificationFourDate, updatenotiFourDate] = useState('')

    function updateNotificationFour(userId, val) {


        console.log(userId, val)

        const updateNotificationFour = {

            notificationFourImage,
            notificationFourHeader: val,
            notificationFourBody,
            notificationFourDate

        }

        console.log(updateNotificationFour, userId)
        dispatch(updateNotificationFourAction(updateNotificationFour, userId))

        currentUser.notificationFourHeader = 'empty';
        localStorage.setItem('currentUser', JSON.stringify(currentUser))




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

                <div className='col-md-8 m-2 p-1 shadow p-3 mb-5 bg-white' style={{ backgroundColor: 'red', color: 'black', borderRadius: '15px' }}>

                    <img src='https://static.vecteezy.com/system/resources/previews/002/002/403/large_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' style={{ height: '150px', height: '150px' }} />



                    <div>
                        <h2 style={{ fontSize: '30px' }}>{currentUser.name}<></>

                            {isVerified ? (

                                <i class="fa fa-check-circle p-1" title="Verified Customer" style={{ fontSize: '20px', color: '#00b9ff' }} aria-hidden="true"></i>

                            ) : (


                                <></>

                            )}

                            <> </><i className="fa fa-edit" style={{ fontSize: '15px' }} type="button" data-bs-toggle="modal" data-bs-target="#updatename" data-bs-whatever="@mdo" ></i></h2>
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
                            {NotificationOneHeader === 'empty' && NotificationTwoHeader === 'empty' && NotificationThreeHeader === 'empty' && NotificationFourHeader === 'empty' && NotificationHeader === 'empty' ? (


                                <small class="text-muted text-center fst-italic"><i class="fa-solid fa-mug-saucer"></i><> </>You're All Caught Up...</small>

                            ) : (

                                <></>

                            )}
                            {NotificationHeader === 'empty' ? (
                                <></>

                            ) : (
                                <div class="card text-center h-100 shadow">
                                    <div class="card-header">
                                        {NotificationType}
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{NotificationHeader}</h5>
                                        <p class="card-text">{NotificationBody}</p>
                                        <a href={NotificationButton} class="btn">Go somewhere</a>
                                    </div>
                                    <div class="card-footer text-muted">
                                        {NotificationDate}
                                    </div>
                                </div>
                            )}

                            <br/>

                            <div class="row row-cols-1 row-cols-md-4 g-4">




                                {NotificationOneHeader === 'empty' ? (
                                    <></>

                                ) : (

                                    < div class="col">
                                        <div class="card h-100 shadow">
                                            <button onClick={() => { updateNotificationOne(currentUser._id, 'empty') }} type="button" class="btn-close p-2" style={{ position: 'absolute', right: '3px' }} aria-label="Close"></button>
                                            <br />
                                            <br />
                                            <img src={NotificationOneImage} class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h5 class="card-title">{NotificationOneHeader}</h5>
                                                <p class="card-text">{NotificationOneBody}</p> </div>
                                            <div class="card-footer">
                                                <small class="text-muted"><i class="fa fa-calendar" aria-hidden="true"></i><> </>{NotificationOneDate}</small>
                                            </div>
                                        </div>
                                    </div>

                                )}


                                {NotificationTwoHeader === 'empty' ? (
                                    <></>

                                ) : (

                                    < div class="col">
                                        <div class="card h-100 shadow">
                                            <button onClick={() => { updateNotificationTwo(currentUser._id, 'empty') }} type="button" class="btn-close p-2" style={{ position: 'absolute', right: '4px' }} aria-label="Close"></button>
                                            <br />
                                            <br />
                                            <img src={NotificationTwoImage} class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h5 class="card-title">{NotificationTwoHeader}</h5>
                                                <p class="card-text">{NotificationTwoBody}</p> </div>
                                            <div class="card-footer">
                                                <small class="text-muted"><i class="fa fa-calendar" aria-hidden="true"></i><> </>{NotificationTwoDate}</small>
                                            </div>
                                        </div>
                                    </div>

                                )}


                                {NotificationThreeHeader === 'empty' ? (
                                    <></>

                                ) : (

                                    <div class="col">
                                        <div class="card h-100 shadow">
                                            <button onClick={() => { updateNotificationThree(currentUser._id, 'empty') }} type="button" class="btn-close p-2" style={{ position: 'absolute', right: '4px' }} aria-label="Close"></button>
                                            <br />
                                            <br />
                                            <img src={NotificationThreeImage} class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h5 class="card-title">{NotificationThreeHeader}</h5>
                                                <p class="card-text">{NotificationThreeBody}</p></div>
                                            <div class="card-footer">
                                                <small class="text-muted"><i class="fa fa-calendar" aria-hidden="true"></i><> </>{NotificationThreeDate}</small>
                                            </div>
                                        </div>
                                    </div>

                                )}

                                {NotificationFourHeader === 'empty' ? (
                                    <></>

                                ) : (

                                    <div class="col">
                                        <div class="card h-100 shadow">
                                            <button onClick={() => { updateNotificationFour(currentUser._id, 'empty') }} type="button" class="btn-close p-2" style={{ position: 'absolute', right: '4px' }} aria-label="Close"></button>
                                            <br />
                                            <br />
                                            <img src={NotificationThreeImage} class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h5 class="card-title">{NotificationFourHeader}</h5>
                                                <p class="card-text">{NotificationFourBody}</p></div>
                                            <div class="card-footer">
                                                <small class="text-muted"><i class="fa fa-calendar" aria-hidden="true"></i><> </>{NotificationFourDate}</small>
                                            </div>
                                        </div>
                                    </div>

                                )}




                            </div>
                           

                        </div>
                    </div>
                </div>
            </div>


        </div>



    )
}