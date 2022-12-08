import React from 'react'
import { Link } from 'react-router-dom'
import video from '../../images/video.mp4'
import s from "./home.module.css"

export const Home = () => {
  return (
    <>
    <div className={s.main}>
      
      <video muted autoPlay loop src={video}/>
      <div className={s.boto}>
      <div className={s.content}>
        <button className={s.cta}>
          <Link to='/dogs'><span>Welcome</span></Link>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
      </div>
      
    </div>
    </>
  )
}
