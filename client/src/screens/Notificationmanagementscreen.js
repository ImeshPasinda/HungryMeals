import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateNotificationOneAction } from '../actions/userActions';
import { updateNotificationTwoAction } from '../actions/userActions';



let userId;

export default function Notificationmanagementscreen() {

    const dispatch = useDispatch()

    const [notificationOneImage, updatenotiOneImage] = useState('')
    const [notificationOneHeader, updatenotiOneHeader] = useState('')
    const [notificationOneBody, updatenotiOneBody] = useState('')
    const [notificationOneDate, updatenotiOneDate] = useState('')

    function updateNotificationOne(userId) {


        console.log(userId)

        const updateNotificationOne = {

            notificationOneImage,
            notificationOneHeader,
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

    function updateNotificationTwo(userId) {


        console.log(userId)

        const updateNotificationTwo = {

            notificationTwoImage,
            notificationTwoHeader,
            notificationTwoBody,
            notificationTwoDate

        }

        console.log(updateNotificationTwo, userId)
        dispatch(updateNotificationTwoAction(updateNotificationTwo, userId))




    }


    const [users, setUsers] = useState([]);


    useEffect(() => {
        function getUsers() {
            axios.get("http://localhost:8070/api/users/getAllusers").then((res) => {
                setUsers(res.data)
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
        {
            name: "Empty",
            cell: row => <button onClick={() => { empty(row._id)}} className="btn">Empty</button>

        }




    ];

    function empty(_id){
        console.log(_id)

        const updateNotificationOne = {

          
            notificationOneHeader,
            

        }

        updatenotiOneHeader = ''
        dispatch(updateNotificationTwoAction(updateNotificationOne, userId))

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

                        title='Notifications'
                        columns={columns}
                        data={users}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"

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
                                            type="Date"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={notificationOneDate}
                                            onChange={(e) => { updatenotiOneDate(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => updateNotificationOne(userId)} type="button" class="btn ">Update</button>
                                <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
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
                                            type="Date"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={notificationTwoDate}
                                            onChange={(e) => { updatenotiTwoDate(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={() => updateNotificationTwo(userId)} type="button" class="btn ">Update</button>
                                <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="exampleModalToggle3" aria-hidden="true" aria-labelledby="exampleModalToggleLabel3" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel3">Modal 3</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Hide this modal and show the first with the button below.
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" data-bs-target="#exampleModalToggle4" data-bs-toggle="modal" data-bs-dismiss="modal">fourth</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="modal fade" id="exampleModalToggle4" aria-hidden="true" aria-labelledby="exampleModalToggleLabel4" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalToggleLabel4">Modal 4</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Hide this modal and show the first with the button below.
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}