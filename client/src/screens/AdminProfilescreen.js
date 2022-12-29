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

                <div className='col-md-8 m-2 p-1 shadow p-3 mb-5 bg-white rounded' style={{ backgroundColor: 'red', color: 'black' }}>

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


                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                    <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn">Go somewhere</a>
                    </div>
                </div>

                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                    <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn">Go somewhere</a>
                    </div>
                </div>

                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                    <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn">Go somewhere</a>
                    </div>
                </div>

                <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                    <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn">Go somewhere</a>
                    </div>
                </div>

                <div className='row justify-content-center '>
                    
                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                        <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn">Go somewhere</a>
                        </div>
                    </div>

                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                        <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn">Go somewhere</a>
                        </div>
                    </div>

                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                        <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn">Go somewhere</a>
                        </div>
                    </div>

                    <div class="card col-md-4 m-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                        <img src="https://static.wixstatic.com/media/618c8c_5b96780e12eb4670ab9717d14cfde2d8~mv2.png" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}