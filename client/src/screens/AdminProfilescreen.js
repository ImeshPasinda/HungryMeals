import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap'


export default function AdminProfilescreen() {


    const dispatch = useDispatch()

    const userstate = useSelector(state => state.adminloginReducer)
    const { currentAdmin } = userstate






    return (
        <div>

            <br />
            <br />
            <br />
            <br />
            <br />

            <h2 style={{ fontSize: '35px' }}>Admin Profile</h2>
            <br />




            <div className='row justify-content-center'>

                <div className='col-md-8 m-2 p-1 shadow p-3 mb-5 bg-white' style={{ backgroundColor: 'red', color: 'black' ,borderRadius: '15px' }}>

                    <img src='https://static.vecteezy.com/system/resources/previews/002/002/403/large_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg' style={{ height: '150px', height: '150px' }} />



                    <div>
                        <h2 style={{ fontSize: '30px' }}>{currentAdmin.name} <i className="fa fa-edit" style={{ fontSize: '15px' }} type="button" data-bs-toggle="modal" data-bs-target="#updatename" data-bs-whatever="@mdo" ></i></h2>
                        <p>{currentAdmin.email} <i className="fa fa-edit" style={{ fontSize: '13px' }} type="button" data-bs-toggle="modal" data-bs-target="#updateemail" data-bs-whatever="@mdo" ></i></p>

                    </div>

                    <p>

                        {/* <a data-bs-toggle ="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fas fa-bell"></i>
                            <span class="badge rounded-pill badge-notification bg-danger">1</span>
                        </a> */}

                        <button className="btn" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            Notifications <i class="fas fa-bell"></i>
                        </button>
                    </p>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            Welcome Back ! {currentAdmin.name}
                        </div>
                    </div>
                </div>



            </div>

            <div className='row justify-content-center '>


                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white" style={{ width: '18rem' , borderRadius: '15px'}}>
                    <img src="https://img.freepik.com/free-vector/people-ordering-food-cafe-online_74855-5913.jpg?w=996&t=st=1672324604~exp=1672325204~hmac=529755ba63bdfa1b037ddba4d350aaa4d2d177bf57fec2d01767f3daf5af4ce8" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">User Management</h5>
                        <p class="card-text">-Manage all customers(their customer profiles,activities)<br></br>
                            -Report about most engaged customers
                        </p>
                        <br />
                        <br />
                        <a href="/admin/customers" class="btn">See More</a>
                    </div>
                </div>

                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem' , borderRadius: '15px'}}>
                    <img src="https://img.freepik.com/free-vector/sales-managers-with-laptops-growth-chart-sales-growth-manager-accounting-sales-promotion-operations-concept-white-background_335657-1704.jpg?w=996&t=st=1672322205~exp=1672322805~hmac=377d46554e381bb05373108af5af77e3aed84add3faa47ce52588dd780a03c64" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Sales Management</h5>
                        <p class="card-text">-Manage all the details about sales<br></br>
                            -Generate daily sales report,monthly sales report<br></br>
                            -Get report about the demands of the pizza items
                        </p>
                        <a href="#" class="btn">See More</a>
                    </div>
                </div>

                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem' , borderRadius: '15px'}}>
                    <img src="https://img.freepik.com/free-vector/flat-design-stock-market-concept_23-2149162443.jpg?w=996&t=st=1672322077~exp=1672322677~hmac=422126355402e7bd7f64cdfa22fa3401f3c587b34f29795381733fe65663d9ba" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Financial Management</h5>
                        <p class="card-text">-Manage all the payment details<br></br>
                            -Get reports of payment details</p>
                        <br />
                        <br />
                        <br />
                        <a href="#" class="btn">See More</a>

                    </div>
                </div>

                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem' , borderRadius: '15px'}}>
                    <img src="https://img.freepik.com/free-vector/flat-people-order-food-online-grocery-shopping-from-mobile-application-internet-purchases-with-home-delivery-from-supermarket-store-smartphone-screen-with-buy-button-basket-full-products_88138-856.jpg?w=996&t=st=1672322610~exp=1672323210~hmac=e8710b985646d06e4743268196964882f3cca772c16aa51c5dd595d716a4dfca" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Order Management</h5>
                        <p class="card-text">-Manage customer's orders,order status<br></br>
                            -Generate reports about all Orders</p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <a href="#" class="btn">See More</a>
                    </div>
                </div>

                <div className='row justify-content-center '>

                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem' , borderRadius: '15px'}}>
                        <img src="https://img.freepik.com/free-vector/team-analysts-working-brand-reputation-social-media_74855-20739.jpg?w=900&t=st=1672323036~exp=1672323636~hmac=5d4c9172b0f0c8c3c4386ce04d662ad728ab166bf106da1763afa0714a76572b" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Feedback Management</h5>
                            <p class="card-text">-Handle all the feedbacks(read,delete,display positive feedbacks on the page)
                            </p>
                            <a href="/admin/feedback" class="btn">See More</a>
                        </div>
                    </div>

                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem' , borderRadius: '15px'}}>
                        <img src="https://img.freepik.com/free-vector/character-illustration-people-with-internet-message-icons_53876-66149.jpg?w=900&t=st=1672323497~exp=1672324097~hmac=8f1145a507dba8e09043821090e0b1a0681a94cd1d95ce7f2459d0cb08ef4fe3" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Notification Management
                            </h5>
                            <p class="card-text">-Manage all types of notification(seasonal offers,promotional details)</p>
                            <br />

                            <a href="/admin/notifications" class="btn">See More</a>
                        </div>
                    </div>

                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem' , borderRadius: '15px'}}>
                        <img src="https://img.freepik.com/free-vector/system-administrators-sysadmins-are-servicing-server-racks-system-administration-upkeeping-configuration-computer-systems-networks-concept-pinkish-coral-blue-palette-vector-illustration_335657-1642.jpg?w=996&t=st=1672481216~exp=1672481816~hmac=b5199f350aeb485298c5145e7e103810a1ce589904445f64fbdfbadddcca8fff" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Service Management</h5>
                            <p class="card-text">-Manage all the details about services <br></br>
                                -Publish advertisements about vacancies(careers in the pizza outlets)</p>
                            <br />

                            <a href="#" class="btn">See More</a>
                        </div>
                    </div>

                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white " style={{ width: '18rem' , borderRadius: '15px'}}>
                        <img src="https://img.freepik.com/free-vector/storehouse-workers-keeping-records-boxes_74855-11065.jpg?w=996&t=st=1672324091~exp=1672324691~hmac=6fa0d99a413adf18a7296c81fa3e66305eeded6ad87ef85c2e3562234b4418a4" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Stock Management
                            </h5>
                            <p class="card-text">-Manage all the stocks(reports about items such as ingredients,beverages..)<br></br>
                                -Get report about the demands of the items
                            </p>
                            <a href="#" class="btn">See More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}