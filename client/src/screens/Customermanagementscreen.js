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

  
 function verification() {
       let index =0;
   
       const VerifiedUsers = new Array();
       while (index <= usersCount) {
           if (activeUsers[index].isVerified) {
   
               // console.log(activeUsers[index].name)
               const DATA = activeUsers[index].name;
               VerifiedUsers.push(DATA)
               // console.log(VerifiedUsers)
           }
           index++;
          
           console.log(VerifiedUsers)
           console.log(VerifiedUsers.length)
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
                    <div className='text-end'>
                        <button  onClick={() => verification()} class="btn" data-bs-target="#exampleModalToggleReport" data-bs-toggle="modal" data-bs-dismiss="modal">Generate Customer Report</button>
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
                                    {/* Verified Users = {VerifiedUsers.length}


                                    <ol>
                                        {VerifiedUsers.map((names) => (
                                            <li>{names}</li>
                                        ))}
                                    </ol> */}


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
