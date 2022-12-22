

export const getAllPizzasReducers=(state={},action)=>{

    switch(action.type)
    {
        case 'GET_PIZZAS_REQUEST':return{
                ...state
        }
        // eslint-disable-next-line no-duplicate-case
        case 'GET_PIZZAS_REQUEST':return{
            pizzas :action.payload
        }
        // eslint-disable-next-line no-duplicate-case
        case 'GET_PIZZAS_REQUEST':return{
            error :action.payload
        }
        default :return state
    }
}