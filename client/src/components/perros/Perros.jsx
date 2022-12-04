import React from 'react'
import { useSelector } from 'react-redux'
import { Perro } from '../perro/Perro'
import s from './perros.module.css'

export const Perros = () => {
    let rasas=useSelector(state=>state.dogs)
    return (
        <div className={s.contenedor}>
            <h1>razas</h1>
            <div className={s.ventas}>
                {
                    rasas.map(r=><Perro key={r.id} id={r.id} image={r.image} name={r.name} temperament={r.temperament} weight={r.weight}/>)
                    // ventas.map((v,i)=><Venta venta={v} index={i}/>)
                }
            </div>
        </div>
    )
}
