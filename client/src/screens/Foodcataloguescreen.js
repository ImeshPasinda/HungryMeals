import React from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrderAction } from '../actions/orderActions';
import { addToCart } from "../actions/cartAction";
import { updateFoodsAction } from '../actions/pizzaAction';


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
      const foods = res.data
      console.log(foods.prices[0].small)

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



  //update news
  const [name, updatefoodName] = useState(foods.name);
  const [image, updatefoodImage] = useState(foods.image);
  const [description, updatefoodDescription] = useState(foods.description);
  const [varients, updatefoodVarients] = useState([]);
  const [prices, updatefoodPrices] = useState([]);
  const [isBeverage, updateIsBeverage] = useState(false);
  const [isVegetarian, updateIsVegetarian] = useState(false);
  const [isNonVeg, updateIsNonVeg] = useState(false);

  useEffect(() => {
    // Check the value of the respective fields and update the state accordingly
    updateIsBeverage(foods.isBeverage);
    updateIsVegetarian(foods.isVegetarian);
    updateIsNonVeg(foods.isNonVeg);
  }, [foods]);

  function updateforfood(foodId) {
    const updateFoods = {
      name,
      image,
      isBeverage,
      isVegetarian,
      isNonVeg,
      description,
      varients: [
        "small",
        "medium",
        "large"
      ],
      prices,
    }
  
    dispatch(updateFoodsAction(updateFoods, foodId));
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
            noDataComponent={<div className="text-center"><p10>No foods available...</p10></div>}
            subHeaderComponent={
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Search Foods..."
                  className='w-100 form-control'
                  value={searchCatalogues}
                  onChange={(e) => setSearchCatalogues(e.target.value)}
                />

                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="allFilter"
                    value=""
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === ""}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>All</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="vegetarianFilter"
                    value="vegetarian"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "vegetarian"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Vegetarian</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="nonvegetarianFilter"
                    value="nonvegetarian"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "nonvegetarian"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Non-Vegetarian</h9>
                </label>
                <label className="p-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="filterType"
                    id="beverageFilter"
                    value="beverage"
                    onChange={(e) => setFilterType(e.target.value)}
                    checked={filterType === "beverage"}
                  />
                  <> </><h9 style={{ fontSize: "18px" }}>Beverages</h9>
                </label>

              </div>

            }
          />





        </div>
      </div>


      {/* Model 1 - Preview */}
      <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">



            <div class="modal-header">


              <h5 class="modal-title" id="exampleModalToggleLabel">
                <h20>Edit Foods</h20>


              </h5>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



            </div>





            <div class="modal-body">

              <div class="container">
                <div class="row">
                  <div class="col order-last">


                    <div class="container text-center">
                      <div class="row">
                        <label style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Food Price List</h9></label>
                        <div class="col">
                          <div style={{ alignItems: 'center' }}>
                            <span class="badge bg-secondary">Small</span>
                            <input
                              type="text"
                              id="foodName"
                              className="form-control"
                              value={prices || foods.prices[0].small}
                              onChange={(e) => { updatefoodPrices(e.target.value) }}
                              style={{ fontFamily: 'Signika Negative ,sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br></br>
                        </div>
                        <div class="col">
                          <div style={{ alignItems: 'center' }}>
                            <span class="badge bg-danger">Medium</span>
                            <input
                              type="text"
                              id="foodName"
                              className="form-control"
                              value={prices || foods.prices[0].medium}
                              onChange={(e) => { updatefoodPrices(e.target.value) }}
                              style={{ fontFamily: 'Signika Negative ,sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                          <br></br>
                        </div>
                        <div class="col">
                          <div style={{ alignItems: 'center' }}>
                            <span class="badge bg-success">Large</span>
                            <input
                              type="text"
                              id="foodName"
                              className="form-control"
                              value={prices || foods.prices[0].large}
                              onChange={(e) => { updatefoodPrices(e.target.value) }}
                              style={{ fontFamily: 'Signika Negative ,sans-serif', color: "black", fontSize: "20px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>



                    <br></br>
                    <br></br>
                  </div>
                  <div class="col">
                    <label><h9 style={{ fontSize: "15px", color: 'black' }}>Food Type</h9></label>
                    <div class="p-1" >

                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="vegetarian"
                          checked={isVegetarian}
                          onChange={() => {
                            updateIsVegetarian(true);
                            updateIsNonVeg(false);
                            updateIsBeverage(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Vegetarian</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="nonVeg"
                          checked={isNonVeg}
                          onChange={() => {
                            updateIsNonVeg(true);
                            updateIsVegetarian(false);
                            updateIsBeverage(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Non-Vegetarian</h9>
                      </label>
                      <label className="p-2">
                        <input
                          type="radio"
                          name="foodType"
                          value="beverage"
                          checked={isBeverage}
                          onChange={() => {
                            updateIsBeverage(true);
                            updateIsVegetarian(false);
                            updateIsNonVeg(false);
                          }}
                        />
                        <> </>
                        <h9 style={{ fontSize: "20px" }}>Beverages</h9>
                      </label>
                      <br></br>
                      <br></br>

                      <div className="form-group">
                        <label htmlFor="foodName"><h9 style={{ fontSize: "15px", color: 'black' }}>Food Name</h9></label>
                        <input
                          type="text"
                          id="foodName"
                          className="form-control"
                          value={name || foods.name}
                          onChange={(e) => { updatefoodName(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "black", fontStyle: "italic", fontSize: "15px" }}
                        />
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label htmlFor="foodDescription" style={{ display: 'block', marginBottom: '10px' }}><h9 style={{ fontSize: "15px", color: 'black' }}>Food Description</h9></label>

                        <textarea
                          class="form-control"
                          id="foodDescription"
                          rows="15"
                          placeholder='Enter Description'
                          value={description || foods.description}
                          onChange={(e) => { updatefoodDescription(e.target.value) }}
                          style={{ fontFamily: 'Mukta, calibri', color: "#6c757d", fontStyle: "italic", fontSize: "15px" }}
                        >

                        </textarea>
                      </div>

                    </div>

                  </div>

                  <div class="col order-first">

                    <div className='row justify-content center'>

                      <div className="shadow p-3 m-1 bg-white" style={{ borderRadius: '15px', border: '1px solid black', width: '350px', textAlign: 'center' }}>



                        <div onClick={handleShow}>

                          <h1>{name || foods.name}</h1>
                          <img src={image || foods.image} className="img-fluid" style={{ height: '200px', width: '200px' }} />

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

                      <label htmlFor="foodImage" style={{ display: 'block', marginBottom: '10px' }}>
                        <br></br>
                        <h9 style={{ fontSize: '15px', color: 'black' }}>Food Image</h9>
                      </label>
                      <textarea
                        class="form-control"
                        id="foodImage"
                        rows="3"
                        placeholder='Enter image src'
                        value={image || foods.image}
                        onChange={(e) => { updatefoodImage(e.target.value) }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px',
                          fontSize: '16px',
                          fontFamily: 'Mukta, calibri',
                          color: '#6c757d',
                          fontStyle: 'italic'
                        }}
                      ></textarea>




                    </div>
                    <br></br>
                  </div>
                </div>
              </div>




            </div>




            <div class="modal-footer">
              <button onClick={() => updateforfood(foodId, updateforfood)} type="button" class="btn " >Update</button>
            </div>

          </div>
        </div>
      </div >


    </div >
  )
}
