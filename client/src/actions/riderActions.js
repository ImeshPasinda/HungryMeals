import axios from "axios";
import Swal from 'sweetalert2';


export const loginRider = (rider) => async dispatch => {

    dispatch({ type: 'RIDER_LOGIN_REQUEST' })

    try {
        const response = await axios.post('/api/delivery/login', rider)
        console.log(response);
        dispatch({ type: 'RIDER_LOGIN_SUCCESS', payload: response.data })
        localStorage.setItem('currentRider', JSON.stringify(response.data))
        window.location.href = '/rider'

    } catch (error) {
        dispatch({ type: 'RIDER_LOGIN_FAILED', payload: error })
    }
}

export const logoutAdmin = () => dispatch => {

    localStorage.removeItem('currentRider')
    
    window.location.href = 'rider/login'
}