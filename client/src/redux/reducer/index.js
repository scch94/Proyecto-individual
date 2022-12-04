const initialstate={
    dogs:[],
    temperaments:[]
}

const rootReducer= (state=initialstate,action)=>{
    switch (action.type){
        case 'GET_PERROS':
            return{
                ...state,
                dogs:action.payload
            };
        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                temperaments:action.payload
            };
        default:return{...state}
    } 
}

export default rootReducer