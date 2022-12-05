const initialstate={
    dogs:[],
    temperaments:[],
    dog:"",
    max:0
}

const rootReducer= (state=initialstate,action)=>{
    switch (action.type){
        case 'GET_PERROS':
            let ordenados=action.payload.sort((a,b)=>{
                return Number.parseInt(b.id) - Number.parseInt(a.id)
            })
            return{
                ...state,
                dogs:action.payload,
                max:ordenados[0].id+1
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
        case 'AUMENTAR_MAX':
            return{
                ...state,
                max:state.max+1
            }
        default:return{...state}
    } 
}

export default rootReducer