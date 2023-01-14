import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateNotificationFourAction, updateNotificationOneAction, updateNotificationThreeAction } from '../actions/userActions';
import { updateNotificationTwoAction } from '../actions/userActions'
import { updateNotificationAction } from '../actions/notificationAction';
import Swal from 'sweetalert2';




let userId;
var val;
var notificationsArray = new Array();


export default function Notificationmanagementscreen() {

    const dispatch = useDispatch()


    const userstate = useSelector(state => state.adminloginReducer)
    const { currentNotifications } = userstate


    const [notificationOneImage, updatenotiOneImage] = useState('')
    const [notificationOneHeader, updatenotiOneHeader] = useState('')
    const [notificationOneBody, updatenotiOneBody] = useState('')
    const [notificationOneDate, updatenotiOneDate] = useState('')
    const [filterdUsers, setFilterdUsers] = useState([]);
    const [search, setSearch] = useState("");


    function updateNotificationOne(userId, val) {



        console.log(userId)

        const updateNotificationOne = {

            notificationOneImage,
            notificationOneHeader,
            notificationOneBody,
            notificationOneDate

        }

        console.log(updateNotificationOne, userId)

        if (notificationOneHeader.trim().length !== 0) {

            dispatch(updateNotificationOneAction(updateNotificationOne, userId))
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'error',
                title: 'Please fill out Header filed!'
            })
        }





    }

    function resetNotificationOne(userId) {



        console.log(userId)

        const updateNotificationOne = {

            notificationOneImage: 'https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3',
            notificationOneHeader: 'empty',
            notificationOneBody: 'empty',
            notificationOneDate: 'empty',

        }

        console.log(updateNotificationOne, userId)
        dispatch(updateNotificationOneAction(updateNotificationOne, userId))

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




    }


    const [notificationThreeImage, updatenotiThreeImage] = useState('')
    const [notificationThreeHeader, updatenotiThreeHeader] = useState('')
    const [notificationThreeBody, updatenotiThreeBody] = useState('')
    const [notificationThreeDate, updatenotiThreeDate] = useState('')

    function updateNotificationThree(userId, val) {


        console.log(userId)

        const updateNotificationThree = {

            notificationThreeImage,
            notificationThreeHeader: val,
            notificationThreeBody,
            notificationThreeDate

        }

        console.log(updateNotificationThree, userId)
        dispatch(updateNotificationThreeAction(updateNotificationThree, userId))




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




    }


    const [notificationType, updatenotificationType] = useState('')
    const [notificationHeader, updatenotificationHeader] = useState('')
    const [notificationBody, updatenotificationBody] = useState('')
    const [notificationButton, updatenotificationButton] = useState('')
    const [notificationDate, updatenotificationDate] = useState('')



    function updateNotification(val) {

        if (val === 'empty') {

            console.log(val)

            const updateNotification = {

                notificationType: "Public Notification",
                notificationHeader: val,
                notificationBody: "empty",
                notificationButton: "#",
                notificationDate: "YYYY-MM-DD",


            }

            currentNotifications[0].notificationType = "Public Notification";
            currentNotifications[0].notificationHeader = "empty";
            currentNotifications[0].notificationBody = "empty";
            currentNotifications[0].notificationButton = "#";
            currentNotifications[0].notificationDate = "YYYY-MM-DD";


            dispatch(updateNotificationAction(updateNotification))

            localStorage.setItem('currentNotifications', JSON.stringify(currentNotifications))
        } else {

            console.log(val)

            const updateNotification = {

                notificationType,
                notificationHeader: val,
                notificationBody,
                notificationButton,
                notificationDate


            }

            console.log(updateNotification)
            dispatch(updateNotificationAction(updateNotification))

            currentNotifications[0].notificationType = notificationType;
            currentNotifications[0].notificationHeader = notificationHeader;
            currentNotifications[0].notificationBody = notificationBody;
            currentNotifications[0].notificationButton = notificationButton;
            currentNotifications[0].notificationDate = notificationDate;



            localStorage.setItem('currentNotifications', JSON.stringify(currentNotifications))
        }


    }







    const [users, setUsers] = useState([]);


    useEffect(() => {
        function getUsers() {
            axios.get("http://localhost:8070/api/users/getAllusers").then((res) => {
                setUsers(res.data);
                setFilterdUsers(res.data);

            }).catch((err) => {
                console.log(err.message)
            })
        }
        getUsers();

    }, [])



    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Notification 1",
            selector: (row) => row.notificationOneHeader,
        },
        {
            name: "Notification 2",
            selector: (row) => row.notificationTwoHeader,
        },

        {
            name: "Notification 3",
            selector: (row) => row.notificationThreeHeader,

        },

        {
            name: "Notification 4",
            selector: (row) => row.notificationFourHeader,

        },
        {
            name: "Update",
            cell: row => <button onClick={() => { getCurrentNotifications(userId = row._id) }} className="btn" data-bs-toggle="modal" href="#staticBackdrop" role="button">Update</button>

        },
        // {
        //     name: "Remove",
        //     cell: row => <button onClick={() => {updateNotificationOne(row._id,notificationOneHeader);updateNotificationOne(row._id,'empty');updateNotificationTwo(row._id,notificationTwoHeader);updateNotificationTwo(row._id,'empty');updateNotificationThree(row._id,notificationThreeHeader);updateNotificationThree(row._id,'empty');updateNotificationFour(row._id,notificationFourHeader);updateNotificationFour(row._id,'empty')}} type="button" class="btn ">Remove All</button>

        // }




    ];


    useEffect(() => {
        const result = users.filter(users => {
            return users.name.toLowerCase().match(search.toLowerCase());
        });

        setFilterdUsers(result);
    }, [search]);




    function getCurrentNotifications(userId) {



        axios.get(`http://localhost:8070/api/users/getcurrentuser/${userId}`).then((res) => {
            setUsers(res.data)


            notificationsArray = res.data
            console.log(notificationsArray.notificationOneHeader)


        }).catch((error) => {
            console.log(error)


        })
    }

 


    return (
        <div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


            <div className='row justify-content-center'>



                <div className='col-md-9 m-3   p-0 ' >

                    <DataTable

                        title=<h1>Custom & Public Notifications <sup><span class="badge bg-success">Added in v1.0.0</span></sup></h1>
                        columns={columns}
                        data={filterdUsers}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search here..."
                                className='w-25 form-control'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}

                            />
                        }

                    />


                    <br />
                    <br />
                    <div className='modal-footer'>
                        <button class="btn" data-bs-target="#exampleModalToggle0" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-paper-plane" aria-hidden="true"></i> Public Notifications</button>
                        <div className='p-1'><button class="btn" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Customer Report</button></div>
                    </div>
                </div>






                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">



                            <div class="modal-header">

                                <h5 class="modal-title" id="exampleModalToggleLabel">Notification <span class="badge bg-dark">1</span>
                                    <> </><span class="btn badge bg-secondary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" >2</span>
                                    <> </><span class="badge bg-secondary">3</span>
                                    <> </><span class="badge bg-secondary">4</span>

                                </h5>

                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                            </div>





                            <div class="modal-body">


                                <div class="container">
                                    <div className='p-3'><h6>Status <sup>

                                        {notificationsArray.notificationOneHeader === 'empty' ? (
                                            <span class="badge bg-danger text-end">Empty</span>
                                        ) : (<span class="badge bg-success text-end">Active</span>)}

                                    </sup></h6></div>

                                    <div class="row justify-content-center">
                                        <div class="col-md">




                                            <div class="form-floating">
                                                <input
                                                    required="true"
                                                    type="text"
                                                    placeholder="https://..."
                                                    class="form-control"
                                                    id="exampleFormControlInput1"
                                                    value={notificationOneImage}
                                                    onChange={(e) => { updatenotiOneImage(e.target.value) }}
                                                />


                                                <label for="floatingInputGrid">Image URL</label>
                                            </div>


                                            <br />
                                            <h6><span class="badge bg-secondary">* ! important Header is Required</span></h6>
                                            <div class="form-floating">
                                                <input
                                                    required="true"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="type header..."
                                                    id="exampleFormControlInput1"
                                                    value={notificationOneHeader}
                                                    onChange={(e) => { updatenotiOneHeader(e.target.value) }}
                                                />


                                                <label for="floatingInputGrid">Header</label>
                                            </div>

                                            <br />
                                            <h6><span class="badge bg-secondary">* ! important maximum word limit 100</span></h6>

                                            <div class="form-floating">
                                                <textarea
                                                    required="true"
                                                    type="text"
                                                    placeholder="type body..."
                                                    class="form-control"
                                                    id="exampleFormControlTextarea1"
                                                    rows="3"
                                                    value={notificationOneBody}
                                                    onChange={(e) => { updatenotiOneBody(e.target.value) }}
                                                />


                                                <label for="floatingInputGrid">Body</label>
                                            </div>







                                            <div class="form-floating">
                                                <input
                                                    required="true"
                                                    type="Date"
                                                    class="form-control"
                                                    id="exampleFormControlInput1"
                                                    value={notificationOneDate}
                                                    onChange={(e) => { updatenotiOneDate(e.target.value) }}
                                                />


                                                <label for="floatingInputGrid">Date</label>
                                            </div>

                                            <div className='p-5'>
                                                <button onClick={() => updateNotificationOne(userId, notificationOneHeader)} type="button" class="btn ">Update</button><> </>
                                                <button onClick={() => { resetNotificationOne(userId) }} type="button" class="btn ">Remove</button>
                                            </div>


                                            {/* <div class="center p-3">
                                            <div className='p-2'> <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 2</button></div>
                                            
                                          
                                            <div className='p-2'> <button class="btn" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 3</button></div>
                                          

                                            <div className='p-2'>  <button class="btn" data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 4</button></div>
                                          

                                        </div> */}





                                        </div>

                                        <div class="col-md m-2">



                                            {notificationsArray.notificationOneHeader === 'empty' ? (
                                                <div class="card shadow" aria-hidden="true">
                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWAgICQdD0xAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=" class="card-img-top" alt="..." />
                                                    <div class="card-body">
                                                        <h5 class="card-title placeholder-glow">
                                                            <span class="placeholder col-6"></span>
                                                        </h5>
                                                        <p class="card-text placeholder-glow">
                                                            <span class="placeholder col-7"></span>
                                                            <span class="placeholder col-4"></span>
                                                            <span class="placeholder col-4"></span>
                                                            <span class="placeholder col-6"></span>
                                                            <span class="placeholder col-8"></span>
                                                        </p>
                                                        <a href="#" tabindex="-1" class="btn  disabled placeholder col-6"></a>
                                                    </div>
                                                </div>

                                            ) : (

                                                <>
                                                    {notificationsArray.notificationOneHeader ? (


                                                        <div class="card h-100 shadow ">

                                                            <img src={notificationsArray.notificationOneImage} class="card-img-top" alt="..." />
                                                            <div class="card-body">
                                                                <h5 class="card-title"><span class="badge bg-dark">Preview </span> {notificationsArray.notificationOneHeader}</h5>
                                                                <p class="card-text" style={{ fontSize: '13px', color: 'gray' }}>{notificationsArray.notificationOneBody}</p>
                                                            </div>
                                                            <div class="card-footer">
                                                                <small class="text-muted"><i class="fa fa-calendar" aria-hidden="true"></i><> </>{notificationsArray.notificationOneDate}</small>
                                                            </div>
                                                        </div>

                                                    ) : (

                                                        <div class="card shadow" aria-hidden="true">
                                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWAgICQdD0xAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=" class="card-img-top" alt="..." />
                                                            <div class="card-body">
                                                                <h5 class="card-title placeholder-glow">
                                                                    <span class="placeholder col-6"></span>
                                                                </h5>
                                                                <p class="card-text placeholder-glow">
                                                                    <span class="placeholder col-7"></span>
                                                                    <span class="placeholder col-4"></span>
                                                                    <span class="placeholder col-4"></span>
                                                                    <span class="placeholder col-6"></span>
                                                                    <span class="placeholder col-8"></span>
                                                                </p>
                                                                <a href="#" tabindex="-1" class="btn  disabled placeholder col-6"></a>
                                                            </div>
                                                        </div>
                                                    )}



                                                </>
                                            )}





                                        </div>

                                    </div>
                                </div>










                                {/* <div class="modal-body">




                            <div class="mb-3" >
                                <label for="exampleFormControlInput1" class="form-label">Image URL</label>
                                <input
                                    required="true"
                                    type="text"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    value={notificationOneImage}
                                    onChange={(e) => { updatenotiOneImage(e.target.value) }}
                                />

                            </div>


                            <div class="mb-3">

                                <label for="exampleFormControlInput1" class="form-label">Header</label>
                                <input
                                    required="true"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    value={notificationOneHeader}
                                    onChange={(e) => { updatenotiOneHeader(e.target.value) }}
                                />

                            </div>

                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Notification Body</label>
                                <textarea
                                    required="true"
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    value={notificationOneBody}
                                    onChange={(e) => { updatenotiOneBody(e.target.value) }}
                                >

                                </textarea>
                            </div>


                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Date</label>
                                <input
                                    required="true"
                                    type="text"
                                    placeholder="YYYY-MM-DD"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    value={notificationOneDate}
                                    onChange={(e) => { updatenotiOneDate(e.target.value) }}
                                />

                            </div>

                        </div>
                        <div class="modal-footer">
                            <button  type="button" class="btn ">Update</button>
                            <button onClick={() => { updateNotificationOne(userId, 'empty') }} type="button" class="btn ">Remove</button>
                            <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 2</button>
                            <button class="btn" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 3</button>
                            <button class="btn" data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 4</button>

                        </div> */}
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">Notification 2</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationTwoImage}
                                        onChange={(e) => { updatenotiTwoImage(e.target.value) }}
                                    />

                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Header</label>
                                    <input
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationTwoHeader}
                                        onChange={(e) => { updatenotiTwoHeader(e.target.value) }}
                                    />

                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Notification Body</label>
                                    <textarea
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={notificationTwoBody}
                                        onChange={(e) => { updatenotiTwoBody(e.target.value) }}
                                    >

                                    </textarea>
                                </div>

                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Date</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={notificationTwoDate}
                                            onChange={(e) => { updatenotiTwoDate(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => updateNotificationTwo(userId, notificationTwoHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => { updateNotificationTwo(userId, 'empty') }} type="button" class="btn ">Remove</button>
                                <button class="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 1</button>
                                <button class="btn" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 3</button>
                                <button class="btn" data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 4</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">Notification 3</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationThreeImage}
                                        onChange={(e) => { updatenotiThreeImage(e.target.value) }}
                                    />

                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Header</label>
                                    <input
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationThreeHeader}
                                        onChange={(e) => { updatenotiThreeHeader(e.target.value) }}
                                    />

                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Notification Body</label>
                                    <textarea
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={notificationThreeBody}
                                        onChange={(e) => { updatenotiThreeBody(e.target.value) }}
                                    >

                                    </textarea>
                                </div>

                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Date</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={notificationThreeDate}
                                            onChange={(e) => { updatenotiThreeDate(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => updateNotificationThree(userId, notificationThreeHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => { updateNotificationThree(userId, 'empty') }} type="button" class="btn ">Remove</button>
                                <button class="btn" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 1</button>
                                <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 2</button>
                                <button class="btn" data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 4</button>
                            </div>
                        </div>

                    </div>
                </div>


                <div class="modal fade" id="exampleModalToggle4" aria-hidden="true" aria-labelledby="exampleModalToggleLabel4" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">Notification 4</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationFourImage}
                                        onChange={(e) => { updatenotiFourImage(e.target.value) }}
                                    />

                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Header</label>
                                    <input
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationFourHeader}
                                        onChange={(e) => { updatenotiFourHeader(e.target.value) }}
                                    />

                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Notification Body</label>
                                    <textarea
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={notificationFourBody}
                                        onChange={(e) => { updatenotiFourBody(e.target.value) }}
                                    >

                                    </textarea>
                                </div>

                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Date</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={notificationFourDate}
                                            onChange={(e) => { updatenotiFourDate(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => updateNotificationFour(userId, notificationFourHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => { updateNotificationFour(userId, 'empty') }} type="button" class="btn ">Remove</button>
                                <button class="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 1</button>
                                <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 2</button>
                                <button class="btn" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal" data-bs-dismiss="modal">Notification 3</button>
                            </div>

                        </div>
                    </div>
                </div>












                <div class="modal fade" id="exampleModalToggle0" aria-hidden="true" aria-labelledby="exampleModalToggle0Label" tabindex="-1">
                    <div class="modal-dialog  modal-dialog-centered">
                        <div class="modal-content">


                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggle0Label"><i style={{ fontSize: '18px' }} class="fa fa-paper-plane" aria-hidden="true"></i> Public Notifications</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>


                            <br />

                            <div className='container'>

                                <div class="card text-center shadow">
                                    <div class="card-header">
                                        {currentNotifications[0].notificationType}
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{currentNotifications[0].notificationHeader}</h5>
                                        <p class="card-text">{currentNotifications[0].notificationBody}</p>
                                        <a href={currentNotifications[0].notificationButton} class="btn">Go somewhere</a>
                                    </div>
                                    <div class="card-footer text-muted">
                                        {currentNotifications[0].notificationDate}
                                    </div>
                                </div>

                            </div>

                            <br />
                            <hr />
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Notification Type</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationType}
                                        onChange={(e) => { updatenotificationType(e.target.value) }}
                                    />

                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Header</label>
                                    <input
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationHeader}
                                        onChange={(e) => { updatenotificationHeader(e.target.value) }}
                                    />

                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Notification Body</label>
                                    <textarea
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={notificationBody}
                                        onChange={(e) => { updatenotificationBody(e.target.value) }}
                                    >

                                    </textarea>
                                </div>

                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Button URL</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="https://........."
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={notificationButton}
                                            onChange={(e) => { updatenotificationButton(e.target.value) }}
                                        />

                                    </div>
                                </div>

                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label">Date</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="YYYY-MM-DD"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={notificationDate}
                                            onChange={(e) => { updatenotificationDate(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => { updateNotification('empty') }} type="button" class="btn ">Remove</button>
                                <button onClick={() => updateNotification(notificationHeader)} type="button" class="btn ">Update</button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>



        </div >
    )
}