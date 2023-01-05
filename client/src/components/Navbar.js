import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions';
import { logoutAdmin } from '../actions/adminActions';

export default function Navbar() {

    const cartState = useSelector(state => state.cartReducer)
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const adminloginstate = useSelector(state => state.adminloginReducer)
    const { currentAdmin } = adminloginstate
    const dispatch = useDispatch()

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 navbar-dark bg-black  fixed-top">

                <div className="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="https://static.wixstatic.com/media/618c8c_698b18719d9142ca9ec080803802ceb4~mv2.png" alt="" width="78" height="45" class="d-inline-block align-text-top" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {currentUser ? (
                                <div className="dropdown mt-2">
                                    
                                    
                                    <a style={{ color: 'white' }} className="dropdown-toggles" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hi, {currentUser.name}
                                    </a> <>  </>
                                    <i className="fas fa-user dropdown-toggles" href="#" role="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}></i>
                                    
                                    
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a className="dropdown-item" href="/orders">Orders</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></a></li>
                                    </ul>
                                </div>
                            ) : (

                                <li className="nav-item">
                                    <a className="nav-link" href="/login">
                                        Login
                                    </a>
                                </li>
                            ) &&
                                currentAdmin ? (

                                
                                <div className="dropdown mt-2">
                                    
                                    <a style={{ color: 'white', width : '120px' }} className="dropdown-toggles" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Hi, {currentAdmin.name}<> </><i className="fas fa-user dropdown-toggles"  style={{ color: 'white' }}></i>
                                    </a>
                                    
                                   
                                    
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                                        <li><a className="dropdown-item" href="/admin">Profile</a></li>

                                        <li><a className="dropdown-item" href="#" onClick={() => { dispatch(logoutAdmin()) }}><li>Logout</li></a></li>
                                    </ul>
                                
                                </div>
                            ) : (

                                <li className="nav-item">
                                    <a className="nav-link " href="/login">
                                        Login
                                    </a>
                                </li>
                            )}



                            {currentUser ? (
                                <li className="nav-item">
                                    <a className="nav-link" href="/feedback">
                                        Feedback
                                    </a>
                                </li>

                            ) : (


                                <li className="nav-item">
                                    <a className="nav-link" href="/feedback">
                                        Feedback
                                    </a>
                                </li>

                            ) && currentAdmin ? (
                                <li className="nav-item">
                                </li>) : (

                                <li className="nav-item">
                                    <a className="nav-link" href="/feedback">
                                        Feedback
                                    </a>
                                </li>

                            )}


                            <div class="dropdown">
                                <li className="nav-item">
                                    <a className="nav-link" >
                                        <i className="fas fa-bell dropdown-toggles" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: 'white' }}></i>
                                        <span class="badge rounded-pill badge-notification " style={{ fontSize: '11px', color: 'white', backgroundColor: 'red' }} >2</span>



                                        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-star" aria-labelledby="dropdownMenuLink">



                                            <li>

                                                <a class="dropdown-item" href="/admin" >
                                                    <p class=" mb-2" style={{ fontSize: '9px' }}>12/22/2022</p>


                                                    <p class="mb-2 " style={{ fontSize: '13px' }}>Check out 9 MORE lessons<br />  on MDB UI Kit. Learn about<br />  Cascading Cards,Modals,<br />   Filtersmore.</p>

                                                    {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                </a>

                                            </li>

                                            <li>

                                                <a class="dropdown-item" href="#">
                                                    <p class="mb-2" style={{ fontSize: '9px' }}>12/22/2022</p>


                                                    <p class="mb-2 " style={{ fontSize: '13px' }}>Check out 9 MORE lessons<br />  on MDB UI Kit. Learn about<br />  Cascading Cards,Modals,<br />   Filtersmore.</p>

                                                    {/* <img src="https://static.toiimg.com/thumb/56933159.cms?imgsize=686279&width=800&height=800" alt="" width="200" height="120" style={{ borderRadius: '15px' }} /> */}




                                                </a>

                                            </li>



                                        </ul>

                                    </a>


                                </li>




                            </div>

                            <li className="nav-item">
                                <a className="nav-link" href="/cart">

                                    <i class="fa fa-shopping-cart" style={{ color: 'white' }} aria-hidden="true"></i>

                                    <span style={{ color: 'red' }}> {cartState.cartItems.length}</span>
                                </a>
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
