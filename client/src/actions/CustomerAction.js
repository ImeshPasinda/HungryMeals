import axios from 'axios'
import Swal from 'sweetalert2'

export const deleteCustomerAction = (userId) => async dispatch => {

    dispatch({ type: 'CUSTOMER_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/users/delete/customer/${userId}`)

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
            title: 'Customer deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/customers');
        }, 1500);



        console.log(response);
        dispatch({ type: 'DELETE_CUSTOMER_SUCCESS' })




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