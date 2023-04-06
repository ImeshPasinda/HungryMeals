import React from 'react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2';
import truncate from 'lodash/truncate';





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
                  className={`badge bg-${row.category === "News" ? "success" : "danger"}`}
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
            cell: row => <button className="btn" data-bs-toggle="modal" href="#staticBackdrop1" role="button">Edit <i class="fas fa-edit" style={{ "color": "white" }}></i></button>

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



        </div >
    )
}