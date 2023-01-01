import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteCustomerAction } from '../actions/CustomerAction';


let userId;


function Customermanagementscreen() {

    const [users, setUsers] = useState([]);
    const [filterdUsers, setFilterdUsers] = useState([]);
    const [search, setSearch] = useState("");

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

    // search button
    useEffect(() => {
        const result = users.filter(users => {
            return users.name.toLowerCase().match(search.toLowerCase());
        });

        setFilterdUsers(result);
    }, [search]);


    //delete function

    const dispatch = useDispatch();

    function deleteUser(userId){

        dispatch(deleteCustomerAction(userId));

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
            selector: (row) => row.notificationOneHeader,
        },
       

        
        {
            name: "Update",
            cell: row => <button onClick={() => { (userId = row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Update</button>

        },
        {
            name: "Delete",
            cell: row => <button onClick={() => { deleteUser(row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Delete</button>

            
        },
        {
            name: "Verification",
            cell: row => <button onClick={() => { (userId = row._id) }} className="btn" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Verification</button>

            
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



            </div>
            </div>
        </div>
    )
}

export default Customermanagementscreen
