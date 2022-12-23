import axios from 'axios'

export const UserFB = (user) => async dispatch => {

    dispatch({ type: 'USER_FEEDBACK_SENDING' })

    try {
        const response = await axios.post('/api/users/feedback', user)
        console.log(response);
        dispatch({ type: 'USER_FEEDBACK_SUCCESS' })

    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAILED', payload: error })
    }
}
