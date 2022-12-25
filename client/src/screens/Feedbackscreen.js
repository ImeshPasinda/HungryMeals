
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { UserFB } from './../actions/feedbackAction';
import { feedbackReducer } from "../reducers/feedbackReducer";
import Loading from "../components/Loading"
import Success from "../components/Success"
import Error from "../components/Error"


function FeedbackScreen() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [subject, setsubject] = useState('')
    const [message, setmessage] = useState('')
    const feedbackstate = useSelector(state => state.feedbackReducer)
    const{error , loading ,success} = feedbackstate

    const dispatch = useDispatch()

    function feedback() {

        const newFeedback = { name, email, subject, message }
        console.log(newFeedback)
        dispatch(UserFB(newFeedback))
    }

    return (
        <div>


            <section class="mb-4">




                <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>

                <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly.
                    Our team will come back to you within
                    a matter of hours to help you.</p>

                <div class="row justify-content-center">


                    <div className='col-md-8 m-2 p-1'>
                    {loading && <Loading/>}
                    {success && <Success success ='Feedback Send Successfully' />}
                    {error && (<Error error = 'Error !!!'/>)}
                        <form id="contact-form" name="contact-form">
                         
                            <div class="row ">


                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <label for="name" class="">Your name</label>
                                        <input type="text"
                                            id="name"
                                            name="name"
                                            class="form-control"
                                            value={name}
                                            onChange={(e) => { setname(e.target.value) }} />

                                    </div>
                                </div>


                                <br></br>
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <label for="email" class="">Your email</label>
                                        <input type="text"
                                            id="email"
                                            name="email"
                                            class="form-control"
                                            value={email}
                                            onChange={(e) => { setemail(e.target.value) }} />

                                    </div>
                                </div>


                            </div>


                            <br></br>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <label for="subject" class="">Subject</label>
                                        <input type="text"
                                            id="subject"
                                            name="subject"
                                            class="form-control"
                                            value={subject}
                                            onChange={(e) => { setsubject(e.target.value) }}
                                        />

                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div class="row">


                                <div class="col-md-12">

                                    <div class="md-form">
                                        <label for="message">Your message</label>
                                        <textarea type="text"
                                            id="message"
                                            name="message" rows="2"
                                            class="form-control md-textarea"
                                            value={message}
                                            onChange={(e) => { setmessage(e.target.value) }} />

                                    </div>

                                </div>
                            </div>


                        </form>
                        <br></br>
                        <div class="text-center text-md-left">
                            <a class="btn " onClick={feedback}>Send</a>
                        </div>
                        <div class="status"></div>
                    </div>

                    <div class="col-md-3 text-center">
                        <ul class="list-unstyled mb-0">
                            <li><i class="fas fa-map-marker-alt fa-2x"></i>
                                <p>New Kandy Road,Malabe,Sri Lanka</p>
                            </li>

                            <li><i class="fas fa-phone mt-4 fa-2x"></i>
                                <p>0765615750</p>
                            </li>

                            <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                                <p>contact@hungrymeals.com</p>
                            </li>
                        </ul>
                    </div>


                </div>

            </section>



        </div>
    )
}

export default FeedbackScreen
