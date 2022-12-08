import React from 'react'
import { Link } from 'react-router-dom'
import s from './navbar.module.css'
import ñ from '../../images/dog.png'


export const Navbar = () => {
    return (
        <>
            {/* <nav className={s.contenedor}>
                <div className={s.navbar}>
                    <div className={s.imagen}>
                        <img href="#"  src={ñ} alt="perros" />
                    </div>
                    <div className={s.links}>
                        <ul className={s.navmenu}>
                            <li><Link to='/'>home</Link></li>
                            <li><Link to='/dogs'>razas</Link></li>
                            <li><Link to='/crear'>crear</Link></li>
                        </ul>
                    </div>
                    
                </div>
            </nav> */}
        <div className={s.containers}>
            <img src={ñ} alt="logo" className={s.nav_img}></img>
            <nav>
                <ul className={s.nav_menu}>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/dogs' >Dogs</Link></li>
                <li><Link to='/crear'>Crear</Link></li>
                </ul>
            </nav>
        </div>
        </>
    )
}
