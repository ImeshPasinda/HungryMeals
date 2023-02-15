import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { updatetickets } from "../../actions/ticketsActions";

export default function TicketsScreen() {

    const dispatch = useDispatch()

    const [ticketHeader, setHeader] = useState('')
    const [ticketSubject, setSubject] = useState('')
    const userstate = useSelector(state => state.loginUserReducer)
    const { currentUser } = userstate

    let userId = currentUser._id;
    
    

    function updateTickets(userId) {
        console.log(userId)
       
        const updateTickets = {

            ticketHeader,
            ticketSubject,
        }

        console.log(updateTickets)
        dispatch(updatetickets(updateTickets ,userId))


    }







    return (

        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='row justify-content-center'>
                <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">

                   
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Ticket Header</label>
                            <input 
                            type="text" 
                            class="form-control" 
                            id="exampleFormControlInput1" 
                            placeholder="" 
                            value={ticketHeader}
                            onChange={(e) => { setHeader(e.target.value) }} 
                            
                            />
                        </div>


                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Ticket Subject</label>
                            <textarea 
                            class="form-control" 
                            id="exampleFormControlTextarea1" 
                            rows="3"
                            value={ticketSubject}
                            onChange={(e) => { setSubject(e.target.value) }} 
                            
                            ></textarea>
                        </div>

                        <button onClick={() => updateTickets(userId)} className="btn mt-3 mb-3 " >SUBMIT</button>
                   

                </div>


            </div>
            <br />

        </div>
    )
}