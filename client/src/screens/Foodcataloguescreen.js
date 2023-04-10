import React from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrderAction } from '../actions/orderActions';
import { addToCart } from "../actions/cartAction";


let foodId;

export default function Foodcataloguescreen() {

  const [catalogues, setCatalogues] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filteredCatalogues, setFilteredCatalogues] = useState([]);
  const [searchCatalogues, setSearchCatalogues] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {

    function getCatalogues() {

      //get all catalogues from database
      axios.get("/api/pizzas/getallpizzas").then((res) => {
        setCatalogues(res.data);
        console.log(res.data);
        setFilteredCatalogues(res.data);
      }).catch((err) => {
        console.log(err.message);
      })
    }

    getCatalogues();

  }, []);



  function getCurrentFood(foodId) {

    axios.get(`/api/pizzas/getcurrentfood/${foodId}`).then((res) => {

      setFoods(res.data);
      foods = res.data
      console.log(foods.name)

    }).catch((error) => {
      console.log(error)


    })
  }



  useEffect(() => {
    const results = catalogues.filter(catalogue => {
      if (filterType === "vegetarian") {
        return catalogue.isVegetarian;
      } else if (filterType === "nonvegetarian") {
        return catalogue.isNonVeg;
      } else if (filterType === "beverage") {
        return catalogue.isBeverage;
      } else {
        return true;
      }
    }).filter(catalogue => catalogue.name.toLowerCase().includes(searchCatalogues.toLowerCase()));
    setFilteredCatalogues(results);
  }, [filterType, catalogues, searchCatalogues]);
  


  const columnsOrders = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Preview",
      selector: (row) => <img width={75} height={75} src={row.image} />,

    },
    // {
    //   name: "Date",
    //   selector: (row) => row.createdAt.substring(0, 10),
    //   sortable: true
    // },
    {
      name: "Details",
      cell: row => <button onClick={() => { getCurrentFood(foodId = row._id) }} className="btn" data-bs-toggle="modal" href="#staticBackdrop1" role="button">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>
    },
    {
      name: "Delete",
      cell: row => <button type="button" class="btn ">Delete <i class="fas fa-trash-alt"></i></button>

    }
  ];



  const [quantity, setquantity] = useState(1)
  const [varient, setvarient] = useState('small')
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const dispatch = useDispatch()

  function addtocart() {

    dispatch(addToCart(catalogues, quantity, varient))
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
        <div className='col-md-9 m-3 p-0'>
          {/* Data table for customer details */}
          <DataTable
            title=<div style={{ paddingTop: '25px' }}><h20>Newsfeed Management <sup><span class="badge bg-danger">Not Completed</span></sup></h20></div>
            columns={columnsOrders}
            data={filteredCatalogues}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            subHeader
            subHeaderComponent={
              <div className="text-center">
                <input
                  type="text"
                  placeholder="Search Foods..."
                  className='w-100 form-control'
                  value={searchCatalogues}
                  onChange={(e) => setSearchCatalogues(e.target.value)}
                />

                <div className="mt-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="filterType"
                      id="allFilter"
                      value=""
                      onChange={(e) => setFilterType(e.target.value)}
                      checked={filterType === ""}
                    />
                    <label className="form-check-label" htmlFor="allFilter">
                      <h9>All</h9>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="filterType"
                      id="vegetarianFilter"
                      value="vegetarian"
                      onChange={(e) => setFilterType(e.target.value)}
                      checked={filterType === "vegetarian"}
                    />
                    <label className="form-check-label" htmlFor="vegetarianFilter">
                      <h9>Vegetarian</h9>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="filterType"
                      id="nonvegetarianFilter"
                      value="nonvegetarian"
                      onChange={(e) => setFilterType(e.target.value)}
                      checked={filterType === "nonvegetarian"}
                    />
                    <label className="form-check-label" htmlFor="nonvegetarianFilter">
                      <h9>Non-Vegetarian</h9>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="filterType"
                      id="beverageFilter"
                      value="beverage"
                      onChange={(e) => setFilterType(e.target.value)}
                      checked={filterType === "beverage"}
                    />
                    <label className="form-check-label" htmlFor="beverageFilter">
                      <h9>Beverages</h9>
                    </label>
                  </div>
                </div>
              </div>
            }
          />





        </div>
      </div>


      {/* Model 1 - Preview */}
      <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Edit Foods</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>





            <div class="modal-body">


              <div className="p-4 m-4" style={{ borderRadius: '25px', textAlign: "left" }}>

                <div class="row gx-5">
                  <div class="col-md-4 mb-4">


                    <div className="shadow p-3 m-1 bg-white" style={{ borderRadius: '15px', border: '1px solid black', width: '300px', textAlign: 'center' }}>



                      <div onClick={handleShow}>

                        <h1>{foods.name}</h1>
                        <img src={foods.image} className="img-fluid" style={{ height: '200px', width: '200px' }} />

                      </div>

                      <div className="flex-container">

                        <div className='w-100 m-1'>
                          <p>Varients</p>
                          <select className='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
                            {foods.varients && foods.varients.map(varient => {
                              return <option value={varient}>{varient}</option>
                            })}
                          </select>
                        </div>

                        <div className='w-100 m-1'>
                          <p>Quantity</p>
                          <select className='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                            {Array(10).keys() && [...Array(10).keys()].map((x, i) => {
                              return <option value={i + 1}>{i + 1}</option>
                            })}
                          </select>
                        </div>



                      </div>

                      <div className="flex-container">

                        <div className='m-1 w-100'>
                          {foods.prices && foods.prices[0] && <h1 className='m-1'>Price: {foods.prices[0][varient] * quantity} LKR</h1>}

                        </div>

                        <div className='m-1 w-100'>
                          <button className="btn"  >ADD TO CART</button>
                        </div>

                      </div>






                    </div>

                  </div>


                  <div class="col-md-6 mb-4">
                    {/* <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3"><i class="fa fa-clock" aria-hidden="true"></i> {news.createdAt && news.createdAt.toString().substring(0, 10)}
                    </span>
                    <> </>
                    <span
                      className={`badge bg-${news.category === "News" ? "success" : "success"}`}
                    >
                      {news.category}
                    </span>

                    <br></br>
                    <h9 style={{ fontSize: "23px" }}>{news.header}</h9>

                    <p10 class="text-muted "><br></br><br></br>
                      {news.description}
                    </p10> */}

                  </div>
                </div>



              </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn " data-bs-target="#staticBackdrop2" data-bs-toggle="modal" data-bs-dismiss="modal">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>
            </div>

          </div>
        </div>
      </div>


    </div >
  )
}
