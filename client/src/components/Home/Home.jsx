import React from 'react'
import { Link } from 'react-router-dom'
import s from './home.module.css'

export const Home = () => {
  return (
    <div className={s.inicio}>
      <div className={s.inicio__container}>
        <button className={s.inicio__button}><Link to='/dogs'>bienvenidos a dogs api</Link></button>
      </div>
    </div>
  )
}
