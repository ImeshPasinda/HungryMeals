import axios from 'axios'
import Swal from 'sweetalert2'


export const UserFeedBack = (newFeedback) => async dispatch => {

    dispatch({ type: 'USER_FEEDBACK_SENDING' })

    try {
        const response = await axios.post('/api/feedback/post',newFeedback )
       
        console.log(response);
        dispatch({ type: 'USER_FEEDBACK_SUCCESS' })
        setTimeout(function(){
            window.location.reload();
         }, 1500);

    } catch (error) {
        dispatch({ type: 'USER_FEEDBACK_FAILED' + error, payload: error })
    }
}

// delete user feedback - feedback management
export const deletefeedbackAction = (userId) => async dispatch => {

    dispatch({ type: 'FEEDBACK_DELETE_REQUEST' })


    try {
        const response = await axios.delete(`/api/feedback/delete/feedback/${userId}`)

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
            title: 'Feedback deleted successfully'
        })

        setTimeout(function () {
            window.location.reload('/admin/feedback');
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