import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteOrderAction } from '../actions/orderActions';

let OrderID 

export default function Ordermanagementscreen() {

  const [orders, setOrders] = useState([]);
  const [filterdOrders, setFilterdOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState("");

  useEffect(() => {

    function getOrders() {

      //get all users from database
      axios.get("http://localhost:8070/api/orders/getallorders").then((res) => {
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true
    },

    {
      name: "Order ID",
      selector: (row) => row._id,
      sortable: true
    },




    {
      name: "Order Details",
      cell: row => <button className="btn">View</button>

    },

    {
      name: "Delete",
      cell: row => <button onClick={() => { deleteOrder(row._id) }} className="btn">Delete</button>


    },

  ]

    // search button
    useEffect(() => {
      const results = orders.filter(orders => {
          return orders._id.toLowerCase().match(searchOrders.toLowerCase());
      });

      setFilterdOrders(results);
  }, [searchOrders]);

  const dispatch = useDispatch();

    function deleteOrder(OrderId) {

        dispatch(deleteOrderAction(OrderId));


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

          {/* Data table for customer details */}
          <DataTable

            title='Order Management - Customers'
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
      </div>
    </div>
  )
}

