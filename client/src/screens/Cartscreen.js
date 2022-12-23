import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from "../actions/cartAction";


import { deleteFromCart } from '../actions/cartAction';

function Cartscreen() {

  const cartstate = useSelector(state => state.cartReducer)
  const cartItems = cartstate.cartItems
  const dispatch = useDispatch()
  var subtotal = cartItems.reduce((x, items) => x + items.price, 0)

  return (
    <div>

      <div className='row justify-content-center'>

        <div className='col-md-6'>
          <h1 style={{ fontSize: '40px' }}>My Cart Details</h1>

          {cartItems.map(items => {


            return <div className='.flex-container'>

              <div className='text-start m-1 w-100'>
                <h1>Name :{items.name} [{items.varient}]</h1>
                <h1>Price :{items.quantity} * {items.prices[0][items.varient]}={items.price}</h1>
                <h1 className="d-inline" >Quantity :</h1>
                <i className="fa fa-plus" aria-hidden="true" onClick={() => { dispatch(addToCart(items, items.quantity + 1, items.varient)) }}></i>
                <b>{items.quantity}</b>

                <i className="fa fa-minus" aria-hidden="true" onClick={() => { dispatch(addToCart(items, items.quantity - 1, items.varient)) }}></i>

              </div>

              {/* 2 */}
              <div className='m-1 w-100'>
                <img src={items.image} style={{ height: '180px', height: '180px' }} />
              </div>

              {/* 3 */}
              <div className='m-1 w-100'>
                <i className="fa fa-trash mt-4" aria-hidden="true" onClick={() => dispatch(deleteFromCart(items))} ></i>

              </div>
              <hr />

            </div>
          })}





        </div>


        <div className='col-md-4'>
          <h2 style={{ fontsize: '45px' }}>SubTotal :{subtotal} /- </h2>
          {/* <Checkout subtotal={subtotal} /> */}
        </div>
      </div>
    </div>
  )
}

export default Cartscreen
