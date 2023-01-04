import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteCustomerAction, addUser } from '../actions/CustomerAction';
import { updateCustomerName, updateCustomerEmail, updateCustomerPassword, updateCustomerVerification } from '../actions/CustomerAction';
import Loading from "../components/Loading"
import Success from "../components/Success"
import Error from "../components/Error"



let userId;
let usersCount;
let usersArray;
let totalVerifiedUsers = 0
const VerifiedUsers = new Array();





function Customermanagementscreen() {




    const [cpassword, setcpassword] = useState('')
    const customeraddstate = useSelector(state => state.addCustomerReducer)
    const { error, loading, success } = customeraddstate


    function addcustomer() {

        if (password != cpassword) {

            alert("passwords not matched")

        } else {

            const user = {

                name,
                email,
                password
            }
            console.log(user)
            dispatch(addUser(user))
        }
    }





    const [users, setUsers] = useState([]);
    const [filterdUsers, setFilterdUsers] = useState([]);
    const [search, setSearch] = useState("");

    const userstate = useSelector(state => state.adminloginReducer)
    const { activeUsers, activeUsersforVerifiedPurpose } = userstate



    useEffect(() => {
        function getUsers() {
            axios.get("http://localhost:8070/api/users/getAllusers").then((res) => {
                setUsers(res.data);
                // console.log(res.data)
              
                usersArray = res.data;
                usersCount = usersArray.length;


                //verification status purpose

                for (let index = 0; index < usersArray.length; index++) {
                    if (res.data[index].isVerified) {
                        const DATA = res.data[index].name;
                        VerifiedUsers.push(DATA)
                        totalVerifiedUsers = totalVerifiedUsers + 1;
                    }

                }
                
                console.log(VerifiedUsers)
                console.log(totalVerifiedUsers)





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
                    <div className='modal-footer'>
                        <button class="btn" data-bs-target="#addnewcustomer" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-plus" aria-hidden="true"></i>Add Customer</button>
                        <div className='p-1'><button class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal">Generate Customer Report</button>
                        </div>
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

                                    <div class="container my-4">

                                        <div class="border p-5 mb-5">

                                            <section>
                                                <div class="row">
                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow shadow" >
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>ACTIVE LIVE USERS <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }} ></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{usersCount}</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                {/* <h5 class="text-muted mb-0">11 467</h5> */}
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>VERIFIED LIVE USERS <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>{totalVerifiedUsers}</strong>
                                                                    <small class="text-success ms-2">
                                                                        <i class="fas fa-arrow-up fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                {/* <h5 class="text-muted mb-0">38 454</h5> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>AVERAGE LIVE TIME <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>00:00</strong>
                                                                    <small class="text-danger ms-2">
                                                                        <i class="fas fa-arrow-down fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                <h5 class="text-muted mb-0"></h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-lg-3 col-md-6 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-uppercase small mb-2">
                                                                    <strong>BOUNCE LIVE RATE <i class="fa-solid fa-circle fa-fade" style={{ fontSize: '13px', color: 'red' }}></i></strong>
                                                                </p>
                                                                <h5 class="mb-0">
                                                                    <strong>00.00%</strong>
                                                                    <small class="text-danger ms-2">
                                                                        <i class="fas fa-arrow-down fa-sm pe-1"></i></small>
                                                                </h5>

                                                                <hr />

                                                                <p class="text-uppercase text-muted small mb-2">
                                                                    Previous period
                                                                </p>
                                                                <h5 class="text-muted mb-0"></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            <section>
                                                <div class="row">
                                                    <div class="col-md-8 mb-4">
                                                        <div class="card">
                                                            <div class="card-body shadow">

                                                                <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                                                    <li class="nav-item" role="presentation">
                                                                        <a class="nav-link active" id="ex1-tab-1" data-mdb-toggle="pill" role="tab"
                                                                            aria-controls="ex1-pills-1" aria-selected="true">Verified Users</a>
                                                                    </li>



                                                                </ul>

                                                                <div className=''> {VerifiedUsers.map((names) => (
                                                                    <ol>{names}<i class="fa fa-check-circle p-1" title="Verified Customer" style={{ fontSize: '14px', color: '#00b9ff' }} aria-hidden="true"></i></ol>

                                                                ))}
                                                                </div>



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
                                                            <div class="card-body shadow">
                                                                <p class="text-center"><strong>Current period</strong></p>
                                                                <div id="pie-chart-current">0</div>
                                                            </div>
                                                        </div>

                                                        <div class="card">
                                                            <div class="card-body shadow">
                                                                <p class="text-center"><strong>Previous period</strong></p>
                                                                <div id="pie-chart-previous">0</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                        </div>


                                    </div>

                                </div>

                                <div class="modal-footer">
                                    <button class="btn" onClick={() => window.print()} >Print</button>
                                    <button class="btn" data-bs-toggle="modal">Close</button>
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


                    <div class="modal fade" id="addnewcustomer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="updateemailLabel">Add new Customer</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">

                                    {loading && <Loading />}
                                    {success && <Success success='Customer Added Successfully' />}
                                    {error && (<Error error='Email already registered' />)}
                                    <form>


                                        <div class="mb-3">
                                            <label for="customer-name" class="col-form-label">Name:</label>
                                            <input

                                                required
                                                type="text"
                                                class="form-control"
                                                id="customer-name"
                                                value={name}
                                                onChange={(e) => { updateCName(e.target.value) }}

                                            />
                                        </div>


                                        <div class="mb-3">
                                            <label for="customer-email" class="col-form-label">Email:</label>
                                            <input

                                                required
                                                type="text"
                                                class="form-control"
                                                id="customer-email"
                                                value={email}
                                                onChange={(e) => { updateCEmail(e.target.value) }}

                                            />
                                        </div>


                                        <div class="mb-3">
                                            <label for="customer-password" class="col-form-label">Password:</label>
                                            <input

                                                required
                                                type="password"
                                                class="form-control"
                                                id="customer-password"
                                                value={password}
                                                onChange={(e) => { updateCPassword(e.target.value) }}

                                            />
                                        </div>

                                        <div class="mb-3">
                                            <label for="customer-cpassword" class="col-form-label">ReType - Password:</label>
                                            <input

                                                required
                                                type="password"
                                                class="form-control"
                                                id="customer-cpassword"
                                                value={cpassword}
                                                onChange={(e) => { setcpassword(e.target.value) }}

                                            />
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">

                                    <button onClick={addcustomer} type="button" class="btn ">Add</button>
                                    <button type="button" class="btn " data-bs-dismiss="modal">Close</button>

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
