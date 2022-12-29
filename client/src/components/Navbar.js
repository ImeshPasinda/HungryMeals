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
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded fixed-top">
                <div className="container-fluid">
                    <a class="navbar-brand" href="/">
                        <img src="https://static.wixstatic.com/media/618c8c_35d7a5f69fbc446199b1a65fc645cca6~mv2.png" alt="" width="78" height="45" class="d-inline-block align-text-top" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {currentUser ? (
                                <div className="dropdown mt-2">
                                    <a style={{ color: 'black' }} className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {currentUser.name}
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a className="dropdown-item" href="/orders">Orders</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => { dispatch(logoutUser()) }}><li>Logout</li></a></li>
                                    </ul>
                                </div>
                            ) : (

                                <li className="nav-item">
                                    <a className="nav-link " href="/login">
                                        Login
                                    </a>
                                </li>
                            ) &&
                                currentAdmin ? (
                                <div className="dropdown mt-2">
                                    <a style={{ color: 'black' }} className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {currentAdmin.name}
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


                            <li className="nav-item">
                                <a className="nav-link" href="/cart">

                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>

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
