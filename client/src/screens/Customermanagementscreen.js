import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteCustomerAction } from '../actions/CustomerAction';
import { updateCustomerName, updateCustomerEmail, updateCustomerPassword, updateCustomerVerification } from '../actions/CustomerAction';



let userId;
let usersCount;
let usersArray;




function Customermanagementscreen() {



    const [users, setUsers] = useState([]);
    const [filterdUsers, setFilterdUsers] = useState([]);
    const [search, setSearch] = useState("");

    const userstate = useSelector(state => state.adminloginReducer)
    const { activeUsers } = userstate



    useEffect(() => {
        function getUsers() {
            axios.get("http://localhost:8070/api/users/getAllusers").then((res) => {
                setUsers(res.data);
                // console.log(res.data)
                localStorage.setItem('activeUsers', JSON.stringify(res.data))

                usersArray = res.data;
                usersCount = usersArray.length;



                // console.log(usersCount)


                setFilterdUsers(res.data);
            }).catch((err) => {
                console.log(err.message)

            })
        }
        getUsers();

    }, [])

    // search button
    useEffect(() => {
        const result = users.filter(users => {
            return users.name.toLowerCase().match(search.toLowerCase());
        });

        setFilterdUsers(result);
    }, [search]);


    //delete function

    const dispatch = useDispatch();

    function deleteUser(userId) {

        dispatch(deleteCustomerAction(userId));

    }

    //update function

    const [name, updateCName] = useState('')
    const [email, updateCEmail] = useState('')
    const [password, updateCPassword] = useState('')

    function updatename(userId) {

        const updateCName = {

            name
        }

        console.log(updateCName, userId)
        dispatch(updateCustomerName(updateCName, userId))


    }



    var isTrue = false
    function updateemail(userId) {

        const updateCEmail = {

            email
        }


        for (let index = 0; index <= usersCount; index++) {

            if (index !== usersCount) {


                if (activeUsers[index].email === email) {


                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'Email already registerd'
                    })

                    setTimeout(function () {
                        window.location.reload('/admin/customers');
                    }, 1500);

                    console.log('Email already registerd')
                    index = 1000

                }
            }


            if (index === usersCount) {


                dispatch(updateCustomerEmail(updateCEmail, userId))

            }


        }



    }



    const VerifiedUsers = new Array();
    for (let index = 0; index < usersCount; index++) {

        if (activeUsers[index].isVerified) {

            // console.log(activeUsers[index].name)
            const DATA = activeUsers[index].name;

            VerifiedUsers.push(DATA)


            //    console.log(VerifiedUsers)

            // dispatch(verificationCount(VerifiedUsers.length))

        }
    }


    console.log(VerifiedUsers)








    function updatepassword(userId) {

        const updateCPassword = {

            password
        }

        console.log(updateCPassword, userId)


        dispatch(updateCustomerPassword(updateCPassword, userId))


    }


    const [isVerified, updateCisVerified] = useState('')

    function updateverification(userId, val) {

        const updateCisVerified = {

            isVerified: val
        }

        console.log(updateCisVerified, userId)


        dispatch(updateCustomerVerification(updateCisVerified, userId, val))


    }



    //create data table
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
            name: "Password",
            selector: (row) => row.password,
        },



        {
            name: "Update",
            cell: row => <button onClick={() => { (userId = row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Update</button>

        },
        {
            name: "Delete",
            cell: row => <button onClick={() => { deleteUser(row._id) }} className="btn" role="button">Delete</button>


        },
        {
            name: "Verification Status",


            cell: row => <> {row.isVerified === true ? (<button onClick={() => { { updateverification(row._id, false) } }} className="btn" role="button">Disable</button>) : (<button onClick={() => { { updateverification(row._id, true) } }} className="btn" role="button">Enable</button>)} </>



        }

    ]

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

                        title='Customer Management'
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
                    <div className='text-end'>
                        <button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal">Generate Customer Report</button>
                    </div>

                    {/* report model */}

                    <div class="modal fade" id="exampleModalToggleReport" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Customer Report</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Active Users = {usersCount} <br />
                                    Verified Users = {VerifiedUsers.length}


                                    <ol>
                                        {VerifiedUsers.map((names) => (
                                            <li>{names}</li>
                                        ))}
                                    </ol>


                                </div>
                                <div class="container my-4">
                                    
                                    <div class="border p-5 mb-5">

                                        <section>
                                            <div class="row">
                                                <div class="col-lg-3 col-md-6 mb-4">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <p class="text-uppercase small mb-2">
                                                                <strong>USERS</strong>
                                                            </p>
                                                            <h5 class="mb-0">
                                                                <strong>14 567</strong>
                                                                <small class="text-success ms-2">
                                                                    <i class="fas fa-arrow-up fa-sm pe-1"></i>13,48%</small>
                                                            </h5>

                                                            <hr />

                                                            <p class="text-uppercase text-muted small mb-2">
                                                                Previous period
                                                            </p>
                                                            <h5 class="text-muted mb-0">11 467</h5>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="col-lg-3 col-md-6 mb-4">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <p class="text-uppercase small mb-2">
                                                                <strong>PAGE VIEWS</strong>
                                                            </p>
                                                            <h5 class="mb-0">
                                                                <strong>51 354 </strong>
                                                                <small class="text-success ms-2">
                                                                    <i class="fas fa-arrow-up fa-sm pe-1"></i>23,58%</small>
                                                            </h5>

                                                            <hr />

                                                            <p class="text-uppercase text-muted small mb-2">
                                                                Previous period
                                                            </p>
                                                            <h5 class="text-muted mb-0">38 454</h5>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-6 mb-4">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <p class="text-uppercase small mb-2">
                                                                <strong>AVERAGE TIME</strong>
                                                            </p>
                                                            <h5 class="mb-0">
                                                                <strong>00:04:20</strong>
                                                                <small class="text-danger ms-2">
                                                                    <i class="fas fa-arrow-down fa-sm pe-1"></i>23,58%</small>
                                                            </h5>

                                                            <hr />

                                                            <p class="text-uppercase text-muted small mb-2">
                                                                Previous period
                                                            </p>
                                                            <h5 class="text-muted mb-0">00:05:20</h5>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-6 mb-4">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <p class="text-uppercase small mb-2">
                                                                <strong>BOUNCE RATE</strong>
                                                            </p>
                                                            <h5 class="mb-0">
                                                                <strong>32.35%</strong>
                                                                <small class="text-danger ms-2">
                                                                    <i class="fas fa-arrow-down fa-sm pe-1"></i>23,58%</small>
                                                            </h5>

                                                            <hr />

                                                            <p class="text-uppercase text-muted small mb-2">
                                                                Previous period
                                                            </p>
                                                            <h5 class="text-muted mb-0">24.35%</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section>
                                            <div class="row">
                                                <div class="col-md-8 mb-4">
                                                    <div class="card">
                                                        <div class="card-body">

                                                            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                                                <li class="nav-item" role="presentation">
                                                                    <a class="nav-link active" id="ex1-tab-1" data-mdb-toggle="pill" href="#ex1-pills-1" role="tab"
                                                                        aria-controls="ex1-pills-1" aria-selected="true">Users</a>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <a class="nav-link" id="ex1-tab-2" data-mdb-toggle="pill" href="#ex1-pills-2" role="tab"
                                                                        aria-controls="ex1-pills-2" aria-selected="false">Page views</a>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <a class="nav-link" id="ex1-tab-3" data-mdb-toggle="pill" href="#ex1-pills-3" role="tab"
                                                                        aria-controls="ex1-pills-3" aria-selected="false">Average time</a>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <a class="nav-link" id="ex1-tab-4" data-mdb-toggle="pill" href="#ex1-pills-4" role="tab"
                                                                        aria-controls="ex1-pills-4" aria-selected="false">Bounce rate</a>
                                                                </li>
                                                            </ul>

                                                            <div class="tab-content" id="ex1-content">
                                                                <div class="tab-pane fade show active" id="ex1-pills-1" role="tabpanel" aria-labelledby="ex1-tab-1">
                                                                    <div id="chart-users"></div>
                                                                </div>
                                                                <div class="tab-pane fade" id="ex1-pills-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                                                                    <div id="chart-page-views"></div>
                                                                </div>
                                                                <div class="tab-pane fade" id="ex1-pills-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                                                                    <div id="chart-average-time"></div>
                                                                </div>
                                                                <div class="tab-pane fade" id="ex1-pills-4" role="tabpanel" aria-labelledby="ex1-tab-4">
                                                                    <div id="chart-bounce-rate"></div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-md-4 mb-4">
                                                    <div class="card mb-4">
                                                        <div class="card-body">
                                                            <p class="text-center"><strong>Current period</strong></p>
                                                            <div id="pie-chart-current"></div>
                                                        </div>
                                                    </div>

                                                    <div class="card">
                                                        <div class="card-body">
                                                            <p class="text-center"><strong>Previous period</strong></p>
                                                            <div id="pie-chart-previous"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                    </div>


                                </div>
                                <div class="modal-footer">
                                    {/* <button class="btn"  data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button> */}
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* name model */}
                    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Update Customer Name</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">

                                        <label for="exampleFormControlInput1" class="form-label">Type New Username</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={name}
                                            onChange={(e) => { updateCName(e.target.value) }}
                                        />

                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button onClick={() => updatename(userId)} type="button" class="btn ">Save Changes</button>


                                    <button class="btn" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal" data-bs-dismiss="modal">Change Email</button>
                                    <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Email model */}
                    <div class="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Update Customer Email</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">

                                        <label for="exampleFormControlInput1" class="form-label">Type New Email</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={email}
                                            onChange={(e) => { updateCEmail(e.target.value) }}
                                        />

                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button onClick={() => updateemail(userId)} type="button" class="btn ">Save Changes</button><br />  <br />
                                    <button class="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Change Name</button><br />  <br />
                                    <button class="btn" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Password model */}
                    <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalToggleLabel">Update Customer Password</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">

                                        <label for="exampleFormControlInput1" class="form-label">Type New Password</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="exampleFormControlInput1"
                                            value={password}
                                            onChange={(e) => { updateCPassword(e.target.value) }}
                                        />

                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button onClick={() => updatepassword(userId)} type="button" class="btn ">Save Changes</button>
                                    <button class="btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Change Name</button>
                                    <button class="btn" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal" data-bs-dismiss="modal">Change Email</button>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default Customermanagementscreen
