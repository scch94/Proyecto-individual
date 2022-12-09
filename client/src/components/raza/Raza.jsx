import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import s from "./rasa.module.css"
export const Raza =({razas}) => {
    let [raza,setRaza]=useState()
    let {id}=useParams()
    let img=useSelector(state=>state.dog)
    // setImg(a)
    useEffect(()=>{
        if(id<265){
            fetch(`https://api.thedogapi.com/v1/breeds/${id}`)
            .then(response=>response.json())
            .then(razas=>{
                setRaza({
                    name: razas.name,
                    temperament: razas.temperament,
                    weight: razas.weight.metric,
                    height: razas.height.metric,
                    life_span: razas.life_span
                })
            })
        }
        else{
            fetch(`http://localhost:3001/dogs/${id}`)
            .then(response=>response.json())
            .then(perro=>{
                setRaza(perro)
            })
        }
    },[id])
    return (
        <>
        {
            raza&&img!==""?(
            <div className={s.pocicion}>
                <div className={s.card}>
                    <div className={s.titulo}>
                        <h1>{raza.name}</h1>
                    </div>
                    <div className={s.info}>
                        <img src={img} alt={raza.name} />
                        <div className={s.datos}>
                            <h4>PESO</h4>
                            <p>{raza.weight} kilos</p>
                            <h4>TAMAÑO</h4>
                            <p>{raza.height} centimetros</p>
                            <h4>AÑOS PROMEDIO</h4>
                            <p>{raza.life_span}</p>
                            <h4 className={s.temp}>TEMPERAMENTO</h4>
                            <span className={s.temp}>{raza.temperament}</span>
                        </div>
                    </div>
                </div>
                {/* <img src={img} alt={raza.name} />
                <div>
                    <h4>{raza.name}</h4>
                    <p>{raza.temperament}</p>
                    <p>{raza.weight}</p>
                    <p>{raza.height}</p>
                    <p>{raza.life_span}</p>
                </div> */}
            </div>
            ):(null)
        }
                
        
    </>   
    )
}
