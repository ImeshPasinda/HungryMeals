import axios from 'axios'

export const UserFB = (newFeedback) => async dispatch => {

    dispatch({ type: 'USER_FEEDBACK_SENDING' })

    try {
        const response = await axios.post('/api/feedback/post',newFeedback )
       
        console.log(response);
        dispatch({ type: 'USER_FEEDBACK_SUCCESS' })
        window.location.reload('/feedback')

    } catch (error) {
        dispatch({ type: 'USER_FEEDBACK_FAILED' + error, payload: error })
    }
}