import axios from 'axios'

export const UserFeedBack = (newFeedback) => async dispatch => {

    dispatch({ type: 'USER_FEEDBACK_SENDING' })

    try {
        const response = await axios.post('/api/feedback/post',newFeedback )
       
        console.log(response);
        dispatch({ type: 'USER_FEEDBACK_SUCCESS' })
        setTimeout(function(){
            window.location.reload();
         }, 1000);

    } catch (error) {
        dispatch({ type: 'USER_FEEDBACK_FAILED' + error, payload: error })
    }
}