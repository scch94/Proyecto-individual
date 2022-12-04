import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Raza = () => {
    let [raza,setRaza]=useState()
    let [img,setImg]=useState()
    let {id}=useParams()
    console.log(id)
    let razas=useSelector(state=>state.dogs)
    useEffect(()=>{
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(response=>response.json())
        .then(perro=>{
            setRaza(perro)
            setImg(razas.find((f)=>f.id===id))
        })
    },[])
    return (
        <div>
            {
                raza?(<div>probando
                    {/* <img src={img.image} alt={raza.name} /> */}
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
