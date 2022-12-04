import React from 'react'
import s from './perro.module.css'
import { Link } from "react-router-dom";

export const Perro = ({id,image,weight,name,temperament}) => {
  return (
    <>
    <article className={s.card}>
        <img className={s.imagen} src={image} alt={name}/>
        <div className={s.card_info}>
            <h3>{name}</h3>
            <span className={s.descripcion}>{temperament}</span>
            <span className={s.unidades}>{weight}</span>
            <Link to={`/raza/${id}`}><button className={s.button}>mas info</button></Link>
        </div>
    </article>
    </>
  )
}
