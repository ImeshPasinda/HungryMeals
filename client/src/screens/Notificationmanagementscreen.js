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


        console.log(userId, val)

        const updateNotificationOne = {

            notificationOneImage,
            notificationOneHeader: val,
            notificationOneBody,
            notificationOneDate

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
                notificationBody : "empty",
                notificationButton : "#",
                notificationDate : "YYYY-MM-DD",


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
            cell: row => <button onClick={() => { (userId = row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Update</button>

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







    return (
        <div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />




            <div className='row justify-content-center'>



                <div className='col-md-9 m-2 p-1 shadow p-3 mb-5 bg-white' style={{ color: 'black', borderRadius: '25px' }}>
                    <h1>Public Notifications</h1>
                    <br /><br />
                    <br />
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
                    <br />
                    <div className=' p-3 '>
                        <button className="btn" data-bs-toggle="modal" href="#exampleModalToggle0" role="button">Update</button>
                        <> </>
                        <button onClick={() => { updateNotification('empty') }} type="button" class="btn ">Remove</button>
                    </div>
                </div>


                <div className='col-md-9 m-3   p-0 ' >

                    <DataTable

                        title='Custom Notifications'
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



                </div>

                <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel">Notification 1</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationOneImage}
                                        onChange={(e) => { updatenotiOneImage(e.target.value) }}
                                    />

                                </div>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Header</label>
                                    <input
                                        class="form-control"
                                        id="exampleFormControlInput1"
                                        value={notificationOneHeader}
                                        onChange={(e) => { updatenotiOneHeader(e.target.value) }}
                                    />

                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Notification Body</label>
                                    <textarea
                                        class="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                        value={notificationOneBody}
                                        onChange={(e) => { updatenotiOneBody(e.target.value) }}
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
                                            value={notificationOneDate}
                                            onChange={(e) => { updatenotiOneDate(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => updateNotificationOne(userId, notificationOneHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => { updateNotificationOne(userId, 'empty') }} type="button" class="btn ">Remove</button>
                                <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Next</button>
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
                                <button class="btn" data-bs-target="#exampleModalToggle3" data-bs-toggle="modal" data-bs-dismiss="modal">Next</button>
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
                                <button class="btn" data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" data-bs-dismiss="modal">Next</button>
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
                                <button class="btn" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>












                <div class="modal fade" id="exampleModalToggle0" aria-hidden="true" aria-labelledby="exampleModalToggle0Label" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggle0Label">Public Notification</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
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
                                <button onClick={() => updateNotification(notificationHeader)} type="button" class="btn ">Update</button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}