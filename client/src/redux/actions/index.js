export const getDogs =()=>dispatch=>{
    return(
        fetch('http://localhost:3001/dogs')
        .then(response=>response.json())
        .then(perros=>dispatch({type:'GET_PERROS',payload:perros}))
    )
}