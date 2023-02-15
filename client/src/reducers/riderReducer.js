export const riderloginReducer = (state = {}, action) => {

    switch (action.type) {

        case 'RIDER_LOGIN_REQUEST': return {
            loading: true
        }
        case 'RIDER_LOGIN_SUCCESS': return {
            loading: false,
            success: true,
            currentRider : action.payload
        }
        case 'RIDER_LOGIN_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state

    }
}
