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

export const putImg=(img)=>{
    return({
        type:'IMG',
        payload:img
    })
}
export const postRaza=(raza)=>{
    return ({
        type:'POST_RAZA',
        payload:raza
    })
}
export const aumentarMax=()=>{
    return({
        type:'AUMENTAR_MAX'
    })
}