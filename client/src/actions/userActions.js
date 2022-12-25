import axios from 'axios'
// import swal from "sweetalert";

export const registerUser = (user) => async dispatch => {

    dispatch({ type: 'USER_REGISTER_REQUEST' })

    try {
        const response = await axios.post('/api/users/register', user)
        console.log(response);
        dispatch({ type: 'USER_REGISTER_SUCCESS' })

    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAILED', payload: error })
    }
}

export const loginUser = (user) => async dispatch => {

    dispatch({ type: 'USER_LOGIN_REQUEST' })

    try {
        const response = await axios.post('/api/users/login', user)
        console.log(response);
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentUser', JSON.stringify(response.data))
        window.location.href = '/'

    } catch (error) {
        dispatch({ type: 'USER_LOGIN_FAILED', payload: error })
    }
}

export const logoutUser = () => dispatch => {

    localStorage.removeItem('currentUser')
    localStorage.removeItem('cartItems')
    window.location.href = '/login'
}



export const updateUserName = (updatename ,id) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_NAME_REQUEST' })

    try {
        const response = await axios.put(`/api/users/update/name/${id}`, updatename )
        console.log(response);
        dispatch({ type: 'UPDATE_USER_NAME_SUCCESS' })

    } catch (error) {
        dispatch({ type: 'UPDATE_USER_NAME_FAILED', payload: error })
    }
}



export const updateUserEmail = (updateemail ,id) => async dispatch => {

    dispatch({ type: 'UPDATE_USER_EMAIL_REQUEST' })

    try {
        const response = await axios.put(`/api/users/update/email/${id}`, updateemail )
        // swal({ 
        //     title: "Good job!",
        //     text: "Student Updated Successfully!",
        //     icon: "success",
        //     button: "Close",
        //   });
        console.log(response);
        dispatch({ type: 'UPDATE_USER_EMAIL_SUCCESS' })
    

    } catch (error) {
        dispatch({ type: 'UPDATE_USER_EMAIL_FAILED', payload: error })
    }
}