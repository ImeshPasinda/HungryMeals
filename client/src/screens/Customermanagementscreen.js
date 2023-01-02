import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteCustomerAction } from '../actions/CustomerAction';
import { updateCustomerName, updateCustomerEmail, updateCustomerPassword } from '../actions/CustomerAction';



let userId;
var usersCount;

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

                var usersArray = res.data;
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

    function updateemail(userId) {

        const updateCEmail = {

            email
        }

        console.log(updateCEmail, userId)
        dispatch(updateCustomerEmail(updateCEmail, userId))


        // let x = 0;
        // while (x <= usersCount) {

        //     x++;
        //     console.log(x);

        //     if (activeUsers[x].email === email) {
        //         console.log('email already registerd')
        //         break;
        //     }
        //     else {
        //         console.log(updateCEmail, userId)
        //         dispatch(updateCustomerEmail(updateCEmail, userId))
        //     }
        // }

    }

    function updatepassword(userId) {

        const updateCPassword = {

            password
        }

        console.log(updateCPassword, userId)


        dispatch(updateCustomerPassword(updateCPassword, userId))


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
            cell: row => <button onClick={() => { (userId = row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">
                {row.isVerified === true ? (<>Disable</>) : (<>Enable</>)}

            </button>


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


                                    <button class="btn" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal" data-bs-dismiss="modal">Change Email</button><br />  <br />
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
