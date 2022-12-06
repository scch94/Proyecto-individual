import React from 'react'
import s from "./footer.module.css"
import ñ from '../../images/dog.png'
export const Footer = () => {
    return (
        <>
            <footer className={s.piePagina}>
                <div className={s.grupo1}>
                    <div className={s.box}>
                        <figure>
                            <img src={ñ} alt="logo" />
                            
                        </figure>
                    </div>
                    <div className={s.box}>
                        <h2>about us</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, quod!</p>
                        
                    </div>
                    <div className={s.box}>
                        <h2>SIGUENOS</h2>
                        <div className={s.redsocial}>
                            <a href="https://www.linkedin.com/in/scch94/" className='fa fa-linkedin'></a>
                            {" "}
                            <a href="https://github.com/scch94" className='fa fa-github'></a>
                        </div>
                    </div>
                </div>
                <div className={s.grupo2}>
                    <small>&copy; 2022 <b>santiago canal</b>-Todos los Derechos Reservados.</small>
                </div>
            </footer>
        </>
    )
}
