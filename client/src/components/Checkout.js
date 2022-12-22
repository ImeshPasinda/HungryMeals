import React from 'react'
import { useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions';

export default function Checkout({ subtotal }) {


    const dispatch = useDispatch()
    function tokenHandler(token) {

        console.log(token);
        dispatch(placeOrder(token, subtotal))


    }


    return (

        <div>

            <StripeCheckout
                amount={subtotal * 100}
                shippingAddress
                token={tokenHandler}
                stripeKey="pk_test_GlFtmasU7tmBohUIk7vMbEnf00NA3VYaa0"
                currency='LKR'
            >

                <button className='btn'>Pay Now</button>
            </StripeCheckout>

        </div>
    )
}