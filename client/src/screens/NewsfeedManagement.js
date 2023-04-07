import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import truncate from 'lodash/truncate';



let newsId;

export default function Newsfeedmanagement() {

    const dispatch = useDispatch()


    const [filterdNews, setFilterdNews] = useState([]);
    const [search, setSearch] = useState("");
    const [news, setNews] = useState([]);

    useEffect(() => {
        function getNews() {
            axios.get("/api/newsfeed/getallnews").then((res) => {
                setNews(res.data);
                setFilterdNews(res.data);

            }).catch((err) => {
                console.log(err.message)
            })
        }
        getNews();

    }, [])



    function getCurrentNews(newsId) {

        axios.get(`/api/newsfeed/getcurrentnews/${newsId}`).then((res) => {


            setNews(res.data);
            news = res.data


        }).catch((error) => {
            console.log(error)


        })
    }




    function ShortenedDataTableHeader({ row }) {
        const maxLength = 25; // Set the maximum length for the header
        const shortenedHeader = truncate(row.header, { length: maxLength }); // Use the truncate function to shorten the header
        return <span>{shortenedHeader}</span>;
    }

    const columns = [
        {
            name: "Name",
            selector: (row) => <ShortenedDataTableHeader row={row} />,

        },
        {
            name: "Preview",
            selector: (row) => <img width={75} height={75} src={row.image} />,

        },

        {
            name: "Category",
            selector: (row) => {
                return (
                    <span
                        className={`badge bg-${row.category === "News" ? "success" : "success"}`}
                    >
                        {row.category}
                    </span>
                );
            },
        },

        {
            name: "Date",
            selector: (row) => row.createdAt.substring(0, 10),
            sortable: true
        },

        {
            name: "Details",
            cell: row => <button onClick={() => { getCurrentNews(newsId = row._id) }} className="btn" data-bs-toggle="modal" href="#staticBackdrop1" role="button">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>

        },
        {
            name: "Delete",
            cell: row => <button type="button" class="btn ">Delete <i class="fas fa-trash-alt"></i></button>

        }




    ];


    useEffect(() => {
        const result = news.filter(news => {
            return news.header.toLowerCase().match(search.toLowerCase());
        });

        setFilterdNews(result);
    }, [search]);






    return (
        <div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


            <div className='row justify-content-center'>



                <div className='col-md-9 m-3   p-0' >

                    <DataTable

                        title=<div style={{ paddingTop: '25px' }}><h20>Newsfeed Management <sup><span class="badge bg-danger">Not Completed</span></sup></h20></div>
                        columns={columns}
                        data={filterdNews}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        selectableRows
                        selectableRowsHighlight
                        subHeader
                        subHeaderComponent={
                            <input

                                type="text"
                                placeholder="Search News..."
                                className='w-25 form-control'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}

                            />
                        }
                        style={{ fontSize: '54px' }}
                    />



                    <br />
                    <br />
                    <div className='modal-footer'>
                        <button class="btn" data-bs-target="#staticBackdropPublicNotification" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-paper-plane" aria-hidden="true"></i> Public Notifications</button>
                        <div className='p-1'><button class="btn" data-bs-target="#" data-bs-toggle="modal" data-bs-dismiss="modal"><i style={{ fontSize: '15px', color: 'white' }} class="fa fa-file" aria-hidden="true"></i> Generate Customer Report</button></div>
                    </div>
                </div>


            </div>


            {/* Model */}
            <div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">



                        <div class="modal-header">


                            <h5 class="modal-title" id="exampleModalToggleLabel">
                                <h20>{news.category === "News" ? "News Preview" : "Event Preview"}</h20>
                            </h5>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>



                        </div>





                        <div class="modal-body">


                            <div className="p-4 m-4" style={{ borderRadius: '25px', textAlign: "left" }}>

                                <div class="row gx-5">
                                    <div class="col-md-4 mb-4">
                                        <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">

                                            <img src={news.image} class="img-fluid  shadow-lg" style={{ borderRadius: '25px' }} />

                                        </div>
                                    </div>

                                    <div class="col-md-6 mb-4">
                                        <span class="badge bg-danger px-2 py-1 shadow-1-strong mb-3"><i class="fa fa-clock" aria-hidden="true"></i> {news.createdAt && news.createdAt.toString().substring(0, 10)}
                                        </span>
                                        <> </>
                                        <span
                                            className={`badge bg-${news.category === "News" ? "success" : "success"}`}
                                        >
                                            {news.category}
                                        </span>
                                        <br></br>
                                        <h9 style={{ fontSize: "23px" }}>{news.header}</h9>

                                        <p10 class="text-muted "><br></br><br></br>
                                            {news.description}
                                        </p10>

                                    </div>
                                </div>



                            </div>




                        </div>

                    </div>
                </div>
            </div>


        </div >
    )
}