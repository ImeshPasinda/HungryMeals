import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateNotificationFourAction, updateNotificationOneAction, updateNotificationThreeAction } from '../actions/userActions';
import { updateNotificationTwoAction } from '../actions/userActions'
import Swal from 'sweetalert2';




let userId;
var val;

export default function Notificationmanagementscreen() {

    const dispatch = useDispatch()

    const [notificationOneImage, updatenotiOneImage] = useState('')
    const [notificationOneHeader, updatenotiOneHeader] = useState('')
    const [notificationOneBody, updatenotiOneBody] = useState('')
    const [notificationOneDate, updatenotiOneDate] = useState('')

    function updateNotificationOne(userId,val) {


        console.log(userId,val)

        const updateNotificationOne = {

            notificationOneImage,
            notificationOneHeader : val,
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

    function updateNotificationTwo(userId,val) {


        console.log(userId,val)

        const updateNotificationTwo = {

            notificationTwoImage,
            notificationTwoHeader : val,
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

    function updateNotificationThree(userId,val) {


        console.log(userId)

        const updateNotificationThree = {

            notificationThreeImage,
            notificationThreeHeader: val ,
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

    function updateNotificationFour(userId,val) {


        console.log(userId ,val)

        const updateNotificationFour = {

            notificationFourImage,
            notificationFourHeader:val,
            notificationFourBody,
            notificationFourDate

        }

        console.log(updateNotificationFour, userId)
        dispatch(updateNotificationFourAction(updateNotificationFour, userId))




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
            cell: row => <button onClick={() => {updateNotificationOne(row._id,notificationOneHeader);updateNotificationOne(row._id,'empty');updateNotificationTwo(row._id,notificationTwoHeader);updateNotificationTwo(row._id,'empty');updateNotificationThree(row._id,notificationThreeHeader);updateNotificationThree(row._id,'empty');updateNotificationFour(row._id,notificationFourHeader);updateNotificationFour(row._id,'empty')}} type="button" class="btn ">Remove All</button>

        }




    ];

    function empty(userId) {
        

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn',
              cancelButton: 'btn'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'delete it!',
            cancelButtonText: 'cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {

            updateNotificationFour(userId)

              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
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

                        title='Custom Notifications'
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
                            <button onClick={() => updateNotificationOne(userId,notificationOneHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => {updateNotificationOne(userId,'empty')} } type="button" class="btn ">Remove</button>
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
                            <button onClick={() => updateNotificationTwo(userId,notificationTwoHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => {updateNotificationTwo(userId,'empty')} } type="button" class="btn ">Remove</button>
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
                            <button onClick={() => updateNotificationThree(userId,notificationThreeHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => {updateNotificationThree(userId,'empty')} } type="button" class="btn ">Remove</button>
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
                                <button onClick={() => updateNotificationFour(userId,notificationFourHeader)} type="button" class="btn ">Update</button>
                                <button onClick={() => {updateNotificationFour(userId,'empty')} } type="button" class="btn ">Remove</button>
                                <button class="btn" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal">Close</button>
                            </div>
                        
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}