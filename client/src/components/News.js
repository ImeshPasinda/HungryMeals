import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from "../actions/cartAction";

export default function News({ news }) {


    return (
        
       
        <div className="shadow-lg p-3 m-4 bg-white" style={{borderRadius: '15px'}}>


           

            <div className="flex-container">

                <div className='w-100 m-1'>
                    <p>{news.name}</p>
                    
                </div>

                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    

                </div>


            </div>

            <div className="flex-container">

               

            </div>

          





        </div>
        

    )
}

