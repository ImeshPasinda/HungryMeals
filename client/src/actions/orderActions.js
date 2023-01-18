import axios from 'axios'
import Swal from 'sweetalert2'

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {

    dispatch({ type: 'PLACE_ORDER_REQUEST' })

    const currentUser = getState().loginUserReducer.currentUser
    const cartItems = getState().cartReducer.cartItems

    try {

        await axios.post('/api/orders/placeorder', { token, subtotal, currentUser, cartItems })
        dispatch({ type: 'PLACE_ORDER_SUCCESS' })
        setTimeout(function(){
            window.location.replace('/orders');
         }, 1000);

    } catch (error) {

        dispatch({ type: 'PLACE_ORDER_FAILED' })
        console.log(error);
    }
}


export const getUserOrders = () => async (dispatch , getState) => {

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_USER_ORDERS_REQUEST' })


    try {

        const response = await axios.post('/api/orders/getuserorders' , {userid : currentUser._id})
        console.log(response);
        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload : response.data })
        

    } catch (error) {

        dispatch({ type: 'GET_USER_ORDERS_FAILED', payload : error })
    }

}

export const deleteOrderAction = (OrderID) => async dispatch => {

    dispatch({ type: 'ORDER_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/orders/delete/Order/${OrderID}`)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Order deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/Orders');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_ORDER_SUCCESS' })




    } catch (error) {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Unsuccessful Operation'
        })


        dispatch({ type: 'DELETE_OPERATION_FAILED', payload: error })
    }
}