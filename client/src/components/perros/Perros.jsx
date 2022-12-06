import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Perro } from '../perro/Perro'
import s from './perros.module.css'

export const Perros = () => {
    let rasas=useSelector(state=>state.dogs)
    let [rasase,setRasase]=useState([...rasas])
    let [ordenamiento,setordenamiento]=useState("")
    function ordenar(){
        console.log(ordenamiento)
        let orden
        if(ordenamiento==="Alfabetico [A-Z]"){
            orden=rasas.sort((a,b)=>{
                if(a.name<b.name)return -1
                if(a.name>b.name)return 1
                return 0
            })
            
        }
        if(ordenamiento==="Alfabetico [Z-A]"){
            orden=rasas.sort((a,b)=>{
                if(a.name>b.name)return -1
                if(a.name<b.name)return 1
                return 0
            })
        }
        if(ordenamiento==="Peso [menor-mayor]"){

            orden=rasas.sort((a,b)=>{
                if(a.weight<b.weight)return -1
                if(a.weight>b.weight)return 1
                return 0
            })
        }
        if(ordenamiento==="Peso [mayor-menor]"){
            console.log("entre")
            orden=rasas.sort((a,b)=>{
                if(a.weight>b.weight)return -1
                if(a.weight<b.weight)return 1
                return 0
            })
        }
        setRasase([...orden])
        
    }
    return (
        <>
            <div>
                <div>
                    <button onClick={ordenar}>ORDEN</button>
                    <select name="ordenamiento" value={ordenamiento} onChange={(e)=>setordenamiento(e.target.value)}>
                        <option value="----" key={0}>----</option>
                        <option value="Alfabetico [A-Z]" key={1}>Alfabetico [A-Z]</option>
                        <option value="Alfabetico [Z-A]" key={2}>Alfabetico [Z-A]</option>
                        <option value="Peso [menor-mayor]" key={3}>Peso [menor-mayor]</option>
                        <option value="Peso [mayor-menor]" key={4}>Peso [mayor-menor]</option>
                        
                    </select>
                    
                </div>
                <div className={s.contenedor}>
                    <h1>razas</h1>
                    <div className={s.ventas}>
                        {
                            rasase.map(r=><Perro key={r.id} id={r.id} image={r.image} name={r.name} temperament={r.temperament} weight={r.weight}/>)
                            // ventas.map((v,i)=><Venta venta={v} index={i}/>)
                        }
                    </div>
                </div>
            </div>
        </>
        
    )
}
