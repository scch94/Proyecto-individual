import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Raza =({razas}) => {
    let [raza,setRaza]=useState()
    let {id}=useParams()
    let img=useSelector(state=>state.dog)
    // setImg(a)
    useEffect(()=>{
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(response=>response.json())
        .then(perro=>{
            setRaza(perro)
        })
    },[id])
    return (
        <div>
            {
                raza&&img!==""?(<div>
                    <img src={img} alt={raza.name} />
                    <div>
                        <h4>{raza.name}</h4>
                        <p>{raza.temperament}</p>
                        <p>{raza.weight}</p>
                        <p>{raza.height}</p>
                        <p>{raza.life_span}</p>
                    </div>
                </div>):(null)
            }
            
        </div>
    )
}
