import axios from "axios"
export const getAllPizzas=()=>{

    dispatchEvent({type:'GET_PIZZAS_REQUEST'})
    try {
            const response=axios.get('/pizzas/getpizzas');
            console.log(response);
            dispatchEvent({type:'GET_PIZZAS_REQUEST',payload:response.data})
    } catch (error) {
        
        dispatchEvent({type:'GET_PIZZAS_REQUEST',payload:error})
    }
}