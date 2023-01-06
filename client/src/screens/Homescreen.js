import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "../components/Pizza";
import { getAllPizzas } from '../actions/pizzaAction'
import Loading from "../components/Loading";
import Error from "../components/Error";



export default function Homescreen() {


    const dispatch = useDispatch()

    const pizzasstate = useSelector(state => state.getAllPizzasReducer)

    const { pizzas, error, loading } = pizzasstate

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])



    return (

        <div>

            <br />
            <br />
            <br />
            <br />
            <br />



            <div className='row justify-content-center'>

                {/* <div className="flex-container shadow p-0 bg-white rounded justify-content-center"> */}
                <div className='col-md-9  shadow-lg p-0 mb-5 bg-white rounded'>
                    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://static.wixstatic.com/media/618c8c_3d0e0b4795ad42af900a44a933f01251~mv2.png" className="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5 className="svg-shadow-xs">First slide label</h5>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="https://static.wixstatic.com/media/618c8c_3d0e0b4795ad42af900a44a933f01251~mv2.png" className="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Second slide label</h5>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="https://static.wixstatic.com/media/618c8c_3d0e0b4795ad42af900a44a933f01251~mv2.png" className="d-block w-100" alt="..." />
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>Third slide label</h5>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>


                
                
                </div>
               




                {loading ? (<Loading />) : error ? (<Error error='Something went wrong' />) : (

                    pizzas.map(pizza => {


                        return <div className='col-md-3 m-3' key={pizza._id}>

                            <div>
                                <Pizza pizza={pizza} />
                            </div>

                        </div>

                    })



                )}


            </div>


        </div>


    )

}