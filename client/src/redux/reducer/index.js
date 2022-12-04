const initialstate={
    dogs:[]
}

const rootReducer= (state=initialstate,action)=>{
    switch (action.type){
        case 'GET_PERROS':
            return{
                ...state,
                dogs:action.payload
            }
        default:return{...state}
    } 
}

export default rootReducer