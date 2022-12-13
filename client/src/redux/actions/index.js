import axios from 'axios'

export const getDogs =()=>dispatch=>{
    return(
        axios.get('http://localhost:3001/dogs')
        .then(response=>response.data)
        .then(perros=>dispatch({type:'GET_PERROS',payload:perros}))
        // fetch('http://localhost:3001/dogs',{
        //     method: 'GET',
        //     mode: 'no-cors'
        // }).then(response=>response.json()).then(perros=>dispatch({type:'GET_PERROS',payload:perros}))
    )
}

export const getTemperaments=()=>dispatch=>{
    return(
        axios.get('http://localhost:3001/temperaments')
        .then(response=>response.data)
        .then(temperamentos=>dispatch({type:'GET_TEMPERAMENTS',payload:temperamentos}))
        //     method: 'GET',
        //     mode: 'no-cors'
        // }).then(response=>response.json()).then(temperamentos=>dispatch({type:'GET_TEMPERAMENTS',payload:temperamentos}))
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