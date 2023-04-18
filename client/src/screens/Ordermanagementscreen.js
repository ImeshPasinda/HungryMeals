import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteOrderAction,
  updateOrderDeliveryAction,
} from "../actions/orderActions";

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

let OrderId;
var Items, Amount, name;

export default function Ordermanagementscreen() {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const [orders, setOrders] = useState([]);
  const [filterdOrders, setFilterdOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState("");

  useEffect(() => {
    function getOrders() {
      //get all users from database
      axios
        .get("/api/orders/getallorders")
        .then((res) => {
          setOrders(res.data);
          console.log(res.data);

          setFilterdOrders(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    getOrders();
  }, []);

  // function orderdetails(OrderId) {
  //   axios
  //     .get("/api/orders/getallorders")
  //     .then((res) => {
  //       setOrders(res.data);
  //       //console.log(OrderId);
  //      console.log(res.data);

  //       for (let index = 0; index < res.data.length; index++) {
  //         if (res.data[index]._id === OrderID) {
  //           Items = res.data[index].orderItems;
  //           Amount = res.data[index].orderAmount;
  //           console.log(Amount)
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }

  function getCurrentOrders(OrderId) {
    axios
      .get(`/api/orders/getcurrentorders/${OrderId}`)
      .then((res) => {
        setOrders(res.data);
        let orders = res.data;
        console.log(orders);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const columnsOrders = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Order ID",
      selector: (row) => row._id,
      sortable: true,
    },

    {
      name: "Order amount",
      selector: (row) => row.orderAmount,
      sortable: true,
    },
    {
      name: "Order Status",
      selector: (row) =>
        row.isDelivered ? (
          <span className="badge bg-success">Approved</span>
        ) : (
          <div>
            <span className="badge bg-warning">Pending</span>
            {row.orderStatus && (
              <span className="badge bg-danger mx-2">Refund Process7</span>
            )}
          </div>
        ),
      sortable: true,
      sortFunction: (a, b) => {
        if (a.orderStatus && !b.orderStatus) {
          return -1;
        } else if (!a.orderStatus && b.orderStatus) {
          return 1;
        } else {
          return 0;
        }
      },
    },

    {
      name: "Order Details",
      cell: (row) => (
        <button
          onClick={() => {
            getCurrentOrders(row._id);
            toggleShow();
          }}
          className="btn"
          role="button"
        >
          View
        </button>
      ),
    },

    {
      name: "Delete",
      cell: (row) => (
        <button
          onClick={() => {
            deleteOrder(row._id);
          }}
          className="btn"
        >
          Delete
        </button>
      ),
    },
  ];

  // search button
  useEffect(() => {
    const results = orders.filter((orders) => {
      return orders._id.toLowerCase().match(searchOrders.toLowerCase());
    });

    setFilterdOrders(results);
  }, [searchOrders]);

  const dispatch = useDispatch();

  function deleteOrder(OrderId) {
    dispatch(deleteOrderAction(OrderId));
  }

  //update isDeliverd orders
  const [isDeliverd, updateisDeliverd] = useState("");

  function updateOrderDelivery(orderId, val) {
    const updateisDeliverd = {
      isDelivered: val,
    };
    console.log(orderId, val);
    dispatch(updateOrderDeliveryAction(updateisDeliverd, orderId));
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="row justify-content-center">
        <div className="col-md-9 m-3   p-0 ">
          {/* Data table for customer details */}
          <DataTable
            title="Order Management - Customers"
            columns={columnsOrders}
            data={filterdOrders}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="450px"
            selectableRows
            selectableRowsHighlight
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search OrderID..."
                className="w-25 form-control"
                value={searchOrders}
                onChange={(e) => setSearchOrders(e.target.value)}
              />
            }
          />
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Detailed Information
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>Customer Name</p>
                  <p className="text-muted">{orders.name}</p>
                  <p>Order Items</p>

                  {orders && orders.orderItems && (
                    <div>
                      {orders.orderItems.map((item) => (
                        <div key={item._id}>
                          <p>{item.name}</p>
                          <p>{item.quantity}</p>
                          <p>{item.prices[0].price}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p>Order Amount</p>
                  <p className="text-muted">{orders.orderAmount}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn " data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100 text-center">
            <MDBCol>
              <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                <MDBModalDialog>
                  <MDBModalContent>
                    <MDBModalHeader className="border-bottom-0"></MDBModalHeader>
                    <MDBModalBody className="text-start text-black p-4">
                      <MDBTypography
                        tag="h4"
                        className="mb-5"
                        style={{ color: "#35558a" }}
                      >
                        Order Details
                      </MDBTypography>
                      {orders.orderStatus && (
                        <div>
                          <span className="ml-3">
                            Customer requested to cancel the order
                          </span>
                          <> </>
                          <button className="btn">Request</button>
                        </div>
                      )}

                      <MDBTypography
                        tag="h5"
                        className="modal-title text-uppercase mb-5"
                        id="exampleModalLabel"
                      >
                        <h9 class="text-muted">Name : </h9> {orders.name}
                      </MDBTypography>
                      <MDBTypography
                        tag="h9"
                        className="modal-title "
                        id="exampleModalLabel"
                      >
                        <div className="d-flex justify-content-between">
                          <p className="small mb-0">Location : </p>
                          <p className="small mb-0">
                            {orders.shippingAddress &&
                              orders.shippingAddress.street +
                                "," +
                                orders.shippingAddress.city}
                          </p>
                        </div>
                      </MDBTypography>
                      <p className="mb-0" style={{ color: "#35558a" }}>
                        <br></br> Order summary
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
                        <p className="fw-bold mb-0">
                          {orders && orders.orderItems && (
                            <div>
                              {orders.orderItems.map((item) => (
                                <div key={item._id}>
                                  <p>
                                    {item.name}(Qty :{item.quantity})
                                  </p>
                                  <p className="text-muted mb-0">
                                    LKR {item.price}
                                  </p>
                                  <br></br>
                                </div>
                              ))}
                            </div>
                          )}
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <h3 className="fw-bold">Total</h3>
                        <h3 className="fw-bold" style={{ color: "#35558a" }}>
                          LKR {orders.orderAmount}
                        </h3>
                      </div>
                    </MDBModalBody>

                    <MDBModalFooter className="d-flex justify-content-center border-top-0 py-4">
                      {orders.isDelivered === true &&
                      orders.orderStatus === false ? (

                        <span className="badge bg-success">Approved</span>
                        
                      ) : orders.orderStatus === true ? (
                        <span className="badge bg-danger">Can't Approve</span>
                      ) : (
                        <button
                        className="btn"
                        onClick={() => {
                          updateOrderDelivery(orders._id, true);
                        }}
                      >
                        Approve
                      </button>
                      )}
                    </MDBModalFooter>
                  </MDBModalContent>
                </MDBModalDialog>
              </MDBModal>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
