// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { updatetickets } from "../../actions/ticketsActions";

// export default function TicketsScreen() {

//     const dispatch = useDispatch()

//     const [ticketHeader, setHeader] = useState('')
//     const [ticketSubject, setSubject] = useState('')
//     const userstate = useSelector(state => state.loginUserReducer)
//     const { currentUser } = userstate

//     let userId = currentUser._id;
    
    

//     function updateTickets(userId) {
//         console.log(userId)
       
//         const updateTickets = {

//             ticketHeader,
//             ticketSubject,
//         }

//         console.log(updateTickets)
//         dispatch(updatetickets(updateTickets ,userId))


//     }







//     return (

//         <div>
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <br />
//             <div className='row justify-content-center'>
//                 <div className="col-md-5 mt-5 text-start shadow p-3 mb-5 bg-white rounded">

                   
//                         <div class="form-group">
//                             <label for="exampleFormControlInput1">Ticket Header</label>
//                             <input 
//                             type="text" 
//                             class="form-control" 
//                             id="exampleFormControlInput1" 
//                             placeholder="" 
//                             value={ticketHeader}
//                             onChange={(e) => { setHeader(e.target.value) }} 
                            
//                             />
//                         </div>


//                         <div class="form-group">
//                             <label for="exampleFormControlTextarea1">Ticket Subject</label>
//                             <textarea 
//                             class="form-control" 
//                             id="exampleFormControlTextarea1" 
//                             rows="3"
//                             value={ticketSubject}
//                             onChange={(e) => { setSubject(e.target.value) }} 
                            
//                             ></textarea>
//                         </div>

//                         <button onClick={() => updateTickets(userId)} className="btn mt-3 mb-3 " >SUBMIT</button>
                   

//                 </div>


//             </div>
//             <br />

//         </div>
//     )
// }



import React, { useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Basic() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#35558a" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100 text-center">
            <MDBCol>
              <MDBBtn color="light" size="lg" onClick={toggleShow}>
                <MDBIcon fas icon="info me-2" /> Get information
              </MDBBtn>
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader className="border-bottom-0">
                      <MDBBtn
                        className="btn-close"
                        color="none"
                        onClick={toggleShow}
                      ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="text-start text-black p-4">
                      <MDBTypography
                        tag="h5"
                        className="modal-title text-uppercase mb-5"
                        id="exampleModalLabel"
                      >
                        Johnatan Miller
                      </MDBTypography>
                      <MDBTypography
                        tag="h4"
                        className="mb-5"
                        style={{ color: "#35558a" }}
                      >
                        Thanks for your order
                      </MDBTypography>
                      <p className="mb-0" style={{ color: "#35558a" }}>
                        Payment summary
                      </p>
                      <hr
                        className="mt-2 mb-4"
                        style={{
                          height: "0",
                          backgroundColor: "transparent",
                          opacity: ".75",
                          borderTop: "2px dashed #9e9e9e",
                        }}
                      />

                      <div className="d-flex justify-content-between">
                        <p className="fw-bold mb-0">Ether Chair(Qty:1)</p>
                        <p className="text-muted mb-0">$1750.00</p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="small mb-0">Shipping</p>
                        <p className="small mb-0">$175.00</p>
                      </div>

                      <div className="d-flex justify-content-between pb-1">
                        <p className="small">Tax</p>
                        <p className="small">$200.00</p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">Total</p>
                        <p className="fw-bold" style={{ color: "#35558a" }}>
                          $2125.00
                        </p>
                      </div>
                    </MDBModalBody>

                    <MDBModalFooter className="d-flex justify-content-center border-top-0 py-4">
                      <MDBBtn
                        size="lg"
                        style={{ backgroundColor: "#35558a" }}
                        className="mb-1"
                      >
                        Track your order
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}