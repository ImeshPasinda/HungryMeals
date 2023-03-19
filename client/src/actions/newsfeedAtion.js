import axios from "axios";


export const getAllNews = () => async dispatch => {

    dispatch({ type: 'GET_NEWS_REQUEST' })


    try {

        const response = await axios.get('/api/newsfeed/getallnews')
        console.log(response)
        dispatch({ type: 'GET_NEWS_SUCCESS', payload : response.data })

    } catch (error) {

        dispatch({ type: 'GET_NEWS_FAILED', payload : error })
    }

}