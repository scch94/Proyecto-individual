const initialstate={
    dogs:[],
    temperaments:[],
    dog:"",
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
        case 'IMG':
            return{
                ...state,
                dog:action.payload
            }
        case 'POST_RAZA':
            return{
                ...state,
                dogs:[...state.dogs,action.payload]
            }
        default:return{...state}
    } 
}

export default rootReducer