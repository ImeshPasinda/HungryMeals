import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import News from "../components/News";
import { getAllNews } from "../actions/newsfeedAtion";

export default function Newsfeedscreen() {


    const dispatch = useDispatch()

    const newsstate = useSelector(state => state.getAllNewsReducer)

    const { news, error, loading } = newsstate



    useEffect(() => {
        dispatch(getAllNews())
    }, [])



    return (
        <div>

            <br />
            <br />
            <br />




            <div class="jumbotron img-jmbo" >
                <div class="container p-3">
                    <br />
                    <br />
                    <br />
                    <br />
                    <p style={{ fontSize: "50px", color: "white" }}>News & Events</p>
                    <p>Your content goes here.</p>


                </div>
            </div>




            {loading ? (<Loading />) : error ? (<Error error='Something went wrong' />) : (

                news.map(news => {


                    return <div className='col-md-3 m-3' key={news._id}>

                        <div>
                            <News news={news} />
                        </div>

                    </div>

                })



            )}
        </div>
    )
}
