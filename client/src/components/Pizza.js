import React, { useState } from "react";

import Modal from 'react-bootstrap/Modal';
export default function Pizza({ pizza }) {

    const [quantity, setquantity] = useState(1)
    const [varient, setvarient] = useState('small')
    const [show, setShow] = useState(false);
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <div style={{margin : '80px'}} className ="shadow-lg p-3 mb-5 bg-white rounded">
           <div onClick={handleShow}>
           <h1>{pizza.name}</h1>
            <img src={pizza.image} alt="pizza images" className="img-fluid" style={{ height: '200px', width: '200px' }} />

           </div>
            <div className="flex-container">

                <div className='w-100 m-1'>
                    <p>Varients</p>
                    <select className ='form-control' value={varient} onChange={(e) => { setvarient(e.target.value) }}>
                        {pizza.varients.map(varient => {
                            return <option value={varient}>{varient}</option>
                        })}
                    </select>
                </div>

                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    <select className ='form-control' value={quantity} onChange={(e) => { setquantity(e.target.value) }}>
                        {[...Array(10).keys()].map((x, i) => {
                            return <option value={i + 1}>{i + 1}</option>
                        })}
                    </select>

                </div>


            </div>

            <div className="flex-container">

                <div className='m-1 w-100'>
                    <h1 className='m-1'>Price: {pizza.prices[0][varient] * quantity} LKR</h1>
                </div>

                <div className='m-1 w-100'>
                    <button className="btn">ADD TO CART</button>
                </div>

            </div>


            <button variant="primary" onClick={handleShow}>
        Launch demo modal
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
            <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
         <button className="btn" onClick={handleClose}>CLOSE</button>
        </Modal.Footer>
      </Modal>
        </div>

        
    )
}