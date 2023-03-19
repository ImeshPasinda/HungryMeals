import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from "react";

export default function SalesFinanceScreen() {

    const [orders, setOrders] = useState([]);
    const [filterdOrders, setFilterdOrders] = useState([]);
    const [searchOrders, setSearchOrders] = useState("");

    useEffect(() => {

        function getOrders() {

            //get all users from database
            axios.get("/api/orders/getallorders").then((res) => {
                setOrders(res.data);
                console.log(res.data)


                setFilterdOrders(res.data);


            }).catch((err) => {
                console.log(err.message)

            })
        }

        getOrders();

    }, [])


    const columnsOrders = [
        {
            name: "Transaction ID",
            selector: (row) => row.transactionId,
            sortable: true
        },

        /*{
            name: "Order ID",
            selector: (row) => row._id,
            sortable: true
        },

        {
            name: "Customer ID",
            selector: (row) => row.userid,
            sortable: true
        },

        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },*/

        {
            name: "Amount(LKR)",
            selector: (row) => row.orderAmount,
            sortable: true
        },

        {
            name: "Date",
            selector: (row) => row.createdAt.substring(0, 10),
            sortable: true
        },

        {
            name: "Trasaction Details",
            cell: row => <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>

        },

        {
            name: "Status",
            cell: row => <button className="btn">Delete</button>


        },

    ]

    // search button
    useEffect(() => {
        const results = orders.filter(orders => {
            return orders._id.toLowerCase().match(searchOrders.toLowerCase());
        });

        setFilterdOrders(results);
    }, [searchOrders]);


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

                    {/* Data table for payment details */}
                    <DataTable

                        title='Sales and Finance Management'
                        columns={columnsOrders}
                        data={filterdOrders}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search OrderID..."
                                className='w-25 form-control'
                                value={searchOrders}
                                onChange={(e) => setSearchOrders(e.target.value)}

                            />

                        }


                    />

                </div>



                {/* model */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Trasaction Details</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
