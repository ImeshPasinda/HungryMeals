import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions';

export default function Navbar() {

    const cartState = useSelector(state => state.cartReducer)
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate
    const dispatch = useDispatch()

    return (
        <div>
            <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">HUNGRY MEALS</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {currentUser ? (
                                <div className="dropdown mt-2">
                                    <a style={{color : 'black'}} className ="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {currentUser.name}
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                
                                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a className="dropdown-item" href="/orders">Orders</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => {dispatch(logoutUser())}}><li>Logout</li></a></li>
                                    </ul>
                                </div>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link " href="/login">
                                        Login
                                    </a>
                                </li>
                            )}

                            <li className="nav-item">
                                <a className="nav-link " href="/">
                                    Login
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/cart">
                                    Cart {cartState.cartItems.length}
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
