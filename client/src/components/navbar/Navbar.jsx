import React from 'react'
import { Link } from 'react-router-dom'
import s from './navbar.module.css'
import ñ from '../../images/dog.png'


export const Navbar = () => {
    return (
        <>
            <div className={s.contenedor}>
                <div className={s.navbar}>
                    <img className={s.logo} src={ñ} alt="perros" />
                    <ul>
                        <li><Link to='/'>home</Link></li>
                        <li><Link to='/dogs'>razas</Link></li>
                        <li>about us</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
