export const getDogs =()=>dispatch=>{
    return(
        fetch('http://localhost:3001/dogs')
        .then(response=>response.json())
        .then(perros=>dispatch({type:'GET_PERROS',payload:perros}))
    )
}

export const getTemperaments=()=>dispatch=>{
    return(
        fetch('http://localhost:3001/temperaments')
        .then(response=>response.json())
        .then(temperamentos=>dispatch({type:'GET_TEMPERAMENTS',payload:temperamentos}))
    )
}

export const getDogsById=(id)=>dispatch=>{
    return(
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(response=>response.json())
        .then(perro=>dispatch({type:'GET_BY_ID',payload:perro}))
    )
}