import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteOrderAction } from '../actions/orderActions';

export default function Foodcataloguescreen() {

    const [catalogues, setCatalogues] = useState([]);
  const [filterdCatalogues, setFilterdCatalogues] = useState([]);
  const [searchCatalogues, setSearchCatalogues] = useState("");

  useEffect(() => {

    function getCatalogues() {

      //get all catalogues from database
      axios.get("/api/pizzas/getallpizzas").then((res) => {
        setCatalogues(res.data);
        console.log(res.data)


        setFilterdCatalogues(res.data);


      }).catch((err) => {
        console.log(err.message)

      })
    }

    getCatalogues();

  }, [])


  // search button
  useEffect(() => {
    const results = catalogues.filter(catalogues => {
        return catalogues.name.toLowerCase().match(searchCatalogues.toLowerCase());
    });

    setFilterdCatalogues(results);
}, [searchCatalogues]);



const columnsOrders = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },

    {
      name: "Preview",
      selector: (row) => <img width={75} height={75} src={row.image}/>,
      sortable: true
    },
    

 

    {
      name: "Details",
      cell: row => <button className="btn">Edit  <i class="fas fa-edit"></i></button>

    },

    

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

        {/* Data table for customer details */}
        <DataTable

          title='Food Catalogue'
          columns={columnsOrders}
          data={filterdCatalogues}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRows
          selectableRowsHighlight
           subHeader
          subHeaderComponent={
            <input

              type="text"
              placeholder="Search Pizza..."
              className='w-25 form-control'
              value={searchCatalogues}
              onChange={(e) => setSearchCatalogues(e.target.value)}

             />

           }


        />

      </div>
    </div>
  </div>
  )
}
