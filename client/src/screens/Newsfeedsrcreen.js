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

    news.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))



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
                    
                    

                    <h10  style={{ fontSize: "45px", color: "white" }}>News & Events <i class="fa fa-pepper-hot" aria-hidden="true"></i></h10>
                    <p style={{ fontSize: "10px", color: "white" }} >Discover the latest food delivery news and events</p> 
                   
                    <br />
                    <br />
                    <br />
                   
                   

                </div>
            </div>

            <br />
            <br />



            <div className='row justify-content-center'>

                {loading ? (<Loading />) : error ? (<Error error='Something went wrong' />) : (

                    news.map(news => {


                        return <div className='col-md-8 m-8' key={news._id}>

                            <div>
                                <News news={news} />
                            </div>

                        </div>

                    })



                )}
            </div>
        </div>
    )
}

