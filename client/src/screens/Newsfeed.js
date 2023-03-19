import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import News from "../components/News";
import { getAllNews } from "../actions/newsfeedAtion";

export default function Newsfeed() {


    const dispatch = useDispatch()

    const newsstate = useSelector(state => state.getAllNewsReducer)
    
    const { news, error, loading } = newsstate



    useEffect(() => {
        dispatch(getAllNews())
    }, [])



    return (
        <div>


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
