import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions';
import Loading from "../components/Loading"
import Success from "../components/Success"
import Error from "../components/Error"


export default function Checkout({ subtotal }) {

    const orderstate = useSelector((state) => state.placeOrderReducer)
    const {loading , error , success} = orderstate
    const dispatch = useDispatch()
    function tokenHandler(token) {

        console.log(token);
        dispatch(placeOrder(token, subtotal))


    }


    return (

        <div>
            {loading && (<Loading/>)}
            {error && (<Error error= 'Something went wrong'/>)}
            {success && (<Success success= 'Your Order Placed Successfully'/>)}

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