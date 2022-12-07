import React from 'react'
import s from "./probando.module.css"
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/index'
import { Link } from 'react-router-dom';
export const Probando = ({id,image,weight,name,temperament}) => {
    let dispatch=useDispatch()
    console.log(temperament)
    function imagen(){
    dispatch(actions.putImg(image))
    }
    return (

    <>
        <Link to={`/raza/${id}`} onClick={imagen}>
            <a href="#">
            <div className={s.flipcard}>
                <div className={s.flipcardinner}>
                    <div className={s.flipcardfront}>
                    <img className={s.imagen} src={image} alt={name}/>
                    </div>
                    <div className={s.flipcardback}>
                        <img src={image} alt={name} />
                        <h2>{name}</h2>
                        <h3>Temperamento</h3>
                        <span>{temperament}</span>
                        <h3>{weight}</h3>
                    </div>
                </div>
            </div>
            </a>
        </Link>
    
    </>
  )
}
