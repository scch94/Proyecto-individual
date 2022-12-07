import React from 'react'
import img from "../../images/error404.jpg"
import s from './error404.module.css'
import { Link } from 'react-router-dom'

export const Error404 = () => {
  return (
    <>
        <div className={s.contendor}>
            <img src={img} alt="404" />
            <div className={s.boto}>
              <div className={s.content}>
                <button className={s.cta}>
                  <Link to='/'><span>return</span></Link>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>
        </div>
    </>
    
  )
}
