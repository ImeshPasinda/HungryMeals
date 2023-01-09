import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pizza from "../components/Pizza";
import { getAllPizzas } from '../actions/pizzaAction'
import Loading from "../components/Loading";
import Error from "../components/Error";
import axios from "axios";



const feedbackArray = new Array();

var feedbackOneMesssage;
var feedbackOneName;

var feedbackTwoMesssage;
var feedbackTwoName;

var feedbackThreeMesssage;
var feedbackThreeName;

export default function Homescreen() {


    const dispatch = useDispatch()

    const pizzasstate = useSelector(state => state.getAllPizzasReducer)
    const [currentFeedbacks, setFeedbacks] = useState([]);
    const { pizzas, error, loading } = pizzasstate



    useEffect(() => {
        dispatch(getAllPizzas())
    }, [])





    useEffect(() => {
        function getFeedbacks() {
            axios.get("http://localhost:8070/api/feedback/getallfeedbacks").then((res) => {
                setFeedbacks(res.data)



                for (let index = 0; index < res.data.length; index++) {

                    if (res.data[index].isDisplayed === true) {
                        const DATA = res.data[index]
                        feedbackArray.push(DATA)




                    }




                }

                feedbackOneMesssage = feedbackArray[0].message;
                feedbackOneName = feedbackArray[0].name;

                feedbackTwoMesssage = feedbackArray[1].message;
                feedbackTwoName = feedbackArray[1].name;

                feedbackThreeMesssage = feedbackArray[2].message;
                feedbackThreeName = feedbackArray[2].name;




            }).catch((err) => {
                console.log(err.message)

            })
        }
        getFeedbacks();

    }, [])


    console.log(feedbackArray.length)

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


                <div>


                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

                <div className='col-md-9  shadow-lg p-0 mb-5 bg-white rounded'>
                    <div id="carouselExampleControls" class="carousel slide" >
                        <div class="carousel-inner">


                            {feedbackArray.length === 3 ? (

                                <div>

                                    <div class="carousel-item active">
                                        <img src="https://static.wixstatic.com/media/618c8c_66b85eea9a4e44308771a5947da637c1~mv2.png" class="d-block w-100" alt="..." />
                                        <div class="carousel-caption" style={{ postition: 'absolute' }}>

                                            <div class="row text-center">
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-0">


                                                    <p class="px-xl-3" >
                                                        <i class="fas fa-quote-left pe-2"></i>{feedbackOneMesssage}
                                                    </p>
                                                    <p style={{ fontSize: '12px' }}>{feedbackOneName}</p>
                                                    <ul class="list-unstyled d-flex justify-content-center mb-0">
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="far fa-star fa-sm text-warning"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>



                                    </div>



                                    <div class="carousel-item">
                                        <img src="https://static.wixstatic.com/media/618c8c_66b85eea9a4e44308771a5947da637c1~mv2.png" class="d-block w-100" alt="..." />
                                        <div class="carousel-caption" style={{ postition: 'absolute' }}>

                                            <div class="row text-center">
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-5 mb-md-0">



                                                </div>
                                                <div class="col-md-4 mb-0">


                                                    <p class="px-xl-3" >
                                                        <i class="fas fa-quote-left pe-2"></i>{feedbackTwoMesssage}
                                                    </p>
                                                    <p style={{ fontSize: '12px' }}>{feedbackTwoName}</p>
                                                    <ul class="list-unstyled d-flex justify-content-center mb-0">
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="far fa-star fa-sm text-warning"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>
                                    </div>



                                    <div class="carousel-item">
                                        <img src="https://static.wixstatic.com/media/618c8c_66b85eea9a4e44308771a5947da637c1~mv2.png" class="d-block w-100" alt="..." />
                                        <div class="carousel-caption" style={{ postition: 'absolute' }}>

                                            <div class="row text-center">
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-5 mb-md-0">



                                                </div>
                                                <div class="col-md-4 mb-0">


                                                    <p class="px-xl-3" >
                                                        <i class="fas fa-quote-left pe-2"></i>{feedbackThreeMesssage}
                                                    </p>
                                                    <p style={{ fontSize: '12px' }}>{feedbackThreeName}</p>
                                                    <ul class="list-unstyled d-flex justify-content-center mb-0">
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="far fa-star fa-sm text-warning"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div> 

                            ):(<></>) && feedbackArray.length === 2 ? (

                                <div>

                                    <div class="carousel-item active">
                                        <img src="https://static.wixstatic.com/media/618c8c_66b85eea9a4e44308771a5947da637c1~mv2.png" class="d-block w-100" alt="..." />
                                        <div class="carousel-caption" style={{ postition: 'absolute' }}>

                                            <div class="row text-center">
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-0">


                                                    <p class="px-xl-3" >
                                                        <i class="fas fa-quote-left pe-2"></i>{feedbackOneMesssage}
                                                    </p>
                                                    <p style={{ fontSize: '12px' }}>{feedbackOneName}</p>
                                                    <ul class="list-unstyled d-flex justify-content-center mb-0">
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="far fa-star fa-sm text-warning"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>



                                    </div>



                                    <div class="carousel-item">
                                        <img src="https://static.wixstatic.com/media/618c8c_66b85eea9a4e44308771a5947da637c1~mv2.png" class="d-block w-100" alt="..." />
                                        <div class="carousel-caption" style={{ postition: 'absolute' }}>

                                            <div class="row text-center">
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-5 mb-md-0">



                                                </div>
                                                <div class="col-md-4 mb-0">


                                                    <p class="px-xl-3" >
                                                        <i class="fas fa-quote-left pe-2"></i>{feedbackTwoMesssage}
                                                    </p>
                                                    <p style={{ fontSize: '12px' }}>{feedbackTwoName}</p>
                                                    <ul class="list-unstyled d-flex justify-content-center mb-0">
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="far fa-star fa-sm text-warning"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>


                            ) :(<></>) && feedbackArray.length === 1 ? (

                                <div>

                                    <div class="carousel-item active">
                                        <img src="https://static.wixstatic.com/media/618c8c_66b85eea9a4e44308771a5947da637c1~mv2.png" class="d-block w-100" alt="..." />
                                        <div class="carousel-caption" style={{ postition: 'absolute' }}>

                                            <div class="row text-center">
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-5 mb-md-0">

                                                </div>
                                                <div class="col-md-4 mb-0">


                                                    <p class="px-xl-3" >
                                                        <i class="fas fa-quote-left pe-2"></i>{feedbackOneMesssage}
                                                    </p>
                                                    <p style={{ fontSize: '12px' }}>{feedbackOneName}</p>
                                                    <ul class="list-unstyled d-flex justify-content-center mb-0">
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="fas fa-star fa-sm text-warning"></i>
                                                        </li>
                                                        <li>
                                                            <i class="far fa-star fa-sm text-warning"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>


                                        </div>



                                    </div>
                                </div>

                            ) : (
                                <div>

                                <div class="carousel-item active">
                                    <img src="https://static.wixstatic.com/media/618c8c_66b85eea9a4e44308771a5947da637c1~mv2.png" class="d-block w-100" alt="..." />
                                    <div class="carousel-caption" style={{ postition: 'absolute' }}>

                                        <div class="row text-center">
                                            <div class="col-md-4 mb-5 mb-md-0">

                                            </div>
                                            <div class="col-md-4 mb-5 mb-md-0">

                                            </div>
                                            <div class="col-md-4 mb-0">


                                                <p class="px-xl-3" >
                                                    <i class="fas fa-quote-left pe-2"></i>Hurry Up Foodies!!! Give Us  Your Valuable Feedback... 
                                                </p>
                                                
                                            </div>
                                        </div>


                                    </div>



                                </div>
                            </div>
                            
                            )}



                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>






    )

}