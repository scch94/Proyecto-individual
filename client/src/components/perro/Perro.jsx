import React from 'react'
import s from './perro.module.css'

export const Perro = ({id,image,weight,name,temperament}) => {
  return (
    <>
    <article className={s.card}>
        <img className={s.imagen} src={image} alt={name}/>
        <div className={s.card_info}>
            <h3>{name}</h3>
            <p className={s.descripcion}>{temperament}</p>
            <p className={s.unidades}>{weight}</p>
            <button className={s.button}>mas info</button>
        </div>
    </article>
    </>
  )
}
