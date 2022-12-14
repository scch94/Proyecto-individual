import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './crear.module.css'
import { Perro } from '../perro/Perro'
import * as actions from '../../redux/actions/index'
import { Link } from 'react-router-dom'


export const Crear = () => {
    let [creadorT,setCreadorT]=useState(0)
    let [temp,setTemp]=useState([])
    let [imagen,setImagen]=useState("")
    let [activar,setActivar]=useState(false)
    let [temperament,setTemperament]=useState([])
    let [input,setInput]=useState({name:"", heightMin:"",heightMax:"", weightMin:"",weightMax:"", life_span:"", temperament:""})
    let [error,setError]=useState({name:"", heightMin:"", weightMin:"", life_span:"", temperament:""})
    let temperamentos=useSelector(state=>state.temperaments)
    let id=useSelector(state=>state.max)
    let dispatch=useDispatch();


    function handleChange(e){
        e.preventDefault();
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
        
        //validaciones

        let objError=validate({...input,[e.target.name]:e.target.value})
        setError(objError)
    };
    function validate(input){
        let error={};
        //nombre
        if(!input.name){
            error.name="Nombre de raza requerido"
        }else if(!/^[\s\S]{2,15}$/.test(input.name)) {
            error.name="NOMBRE debe tener entre 2 y 15 letras";
        }
        //weight
        if(!input.weightMin||!input.weightMax){
            error.weightMin="PESO es requerido (min y max)"
        }else if(parseInt(input.weightMin)>parseInt(input.weightMax)){
            error.heightMin="PESO minima debe ser inferior a la maxima";
        }else if(parseInt(input.weightMin)>999||parseInt(input.weightMax)>999){
            error.heightMin="PESO demasiado alto"
        }
        //height
        if(!input.heightMin||!input.heightMax){
            error.heightMin="ALTURA es requerida (min y max)"
        }else if(parseInt(input.heightMin)>parseInt(input.heightMax)){
            error.heightMin="Altura minima debe ser inferior a la maxima";
        }else if(parseInt(input.heightMin)>999||parseInt(input.heightMax)>999){
            error.heightMin="altura demasiado alta"
        }     
        
        //edad
        if(!input.life_span){
            error.life_span="A??OS promedio son requeridos"
        }else if(parseInt(input.life_span)<=0||parseInt(input.life_span)>20){
            error.life_span="A??OS no pueden ser inferiores a 0 ni mayor 20"
        };
        //temperemento
        return error;
    }
    //permite agregar temperamentos del form
    function agregarTemperamentos(e){
        alert(`agregaste el temperamento ${input.temperament} a la raza ${input.name}`)
        e.preventDefault();
        let f
        if(creadorT===0)f=input.temperament
        if(creadorT>0)f=(" ".concat(input.temperament))
        console.log(f)
        f=[f]
        setTemperament((prev)=>[...prev,...f])
        setCreadorT(prev=>prev+1)
        
    }
    //crea una nueva raza
    function crear(e){
        e.preventDefault()
        let temperamento
        temperamento=temperament
        const set = new Set(temperamento);
        temperamento = [...set];
        temperamento=temperamento.toString()
        setTemp(temperamento)
        let weight=((parseInt(input.heightMax)+parseInt(input.heightMin))/2)
        let datos={
            name:input.name,
            height:`entre ${input.heightMin} y ${input.heightMax}`,
            weight:weight,
            life_span:input.life_span,
            id:id,
            img:imagen, 
            temperament:temperamento
        }
        let url="http://localhost:3001/dogs"
        fetch(url,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(datos)
        }).then(res=>res.json())
        .catch(error=>console.error(error))
        .then(response=>console.log(response))
        dispatch(actions.postRaza({id:id,name:input.name,temperament:temperamento,weight:weight,image:imagen}))
        dispatch(actions.aumentarMax())
        alert(`creaste la raza ${input.name}`)
    }
    //abilita la pantalla de previsualisacion de la card
    function observar(e){
        let temperamento
        temperamento=temperament
        const set = new Set(temperamento);
        temperamento = [...set];
        temperamento=temperamento.toString()
        setTemp(temperamento)
        e.preventDefault()
        setActivar(true)
    }
    return (
        <div className={s.pocicion}>  
            <div className={s.contenedor}>
                <div className={s.contenedor_tarjeta}>
                    {
                        activar===true?<Perro key={id} id={id} image={imagen} name={input.name} temperament={temp} weight={`entre ${input.weightMin} y ${input.weightMax}`}/>:(
                            <div className={s.errores}>
                                {
                                    error.name===""?<br />:<p>{error.name}</p>
                                }
                                {
                                    error.weightMin===""?(<br />):(<p>{error.weightMin}</p>)
                                }
                                {
                                    error.heightMin===""?(<br />):(<p>{error.heightMin}</p>)
                                }
                                {
                                    error.life_span===""?(<br />):(<p>{error.life_span}</p>)
                                }
                            </div>
                            )
                    }   
                </div>
                {" "}
                <div className={s.contenedor_formulario}>
                    <h2>crear raza</h2>
                        <div className={error.name? (s.danger):(s.busca)}>
                            <input placeholder="Nombre"  type="text" name='name' value={input.name} onChange={(e)=>handleChange(e)}/>
                        </div>
                        <br />
                        <div className={error.heightMin? (s.danger):(s.busca)}>
                            <input placeholder="Altura min"  type="number" name='heightMin' value={input.heightMin} onChange={(e)=>handleChange(e)}/>
                            {""}
                            <input placeholder="Altura max" type="number" name='heightMax' value={input.heightMax} onChange={(e)=>handleChange(e)}/>
                        </div>
                        <br />
                        <div className={error.weightMin? (s.danger):(s.busca)}>
                            <input placeholder='Peso min' type="number" name='weightMin' value={input.weightMin} onChange={(e)=>handleChange(e)}/>
                            <input placeholder='Peso max' type="number" name='weightMax' value={input.weightMax} onChange={(e)=>handleChange(e)}/>
                        </div>
                        <br />
                        <div className={error.life_span? (s.danger):(s.busca)}>
                            <input  placeholder="A??os promedio" type="number" name='life_span'value={input.life_span} onChange={(e)=>handleChange(e)}/>
                        </div>
                        <br />
                        <div className={error.temperament? (s.danger):(s.busca)}>
                        <br />
                            <div className={s.botontemp}>
                                <button  onClick={(e)=>agregarTemperamentos(e)}>agregar temp</button>
                            </div>
                            <div className={s.display}>
                                <select name="temperament" value={input.temperament} onChange={(e)=>handleChange(e)}>
                                    {
                                        temperamentos.map((t,i)=><option value={t} key={i}>{t}</option>)
                                    }
                                </select>       
                            </div>
                        </div>

                        <br />
                        {/* <div className={s.busca}>
                        <br />
                            <div className={s.botontemp}>
                                <button  onClick={(e)=>quitarTemperamento(e)}>quitar Temp</button>
                            </div>
                            <div className={s.display}>
                                <select name="temperament" value={input.temperament} onChange={(e)=>handleChange(e)}>
                                    {
                                        temperamentos.map((t,i)=><option value={t} key={i}>{t}</option>)
                                    }
                                </select>       
                            </div>
                        </div>

                        <br /> */}
                        <div className={error.name? (s.danger):(s.busca)}>
                            <input placeholder="ruta de la imagen" type="text" id="imagen"value={imagen} onChange={e=>setImagen(e.target.value)} />
                        </div>
                        <br />
                        <div className={error.name? (s.danger):(s.busca)}>
                            {
                                (!Object.keys(error).length>0)?(
                                <>
                    
                                <button  onClick={(e)=>crear(e)}><Link to='/dogs'>enviar</Link></button>
                                {" "}
                                <button onClick={(e)=>observar(e)}>ver tarjeta</button>
                                </>):(
                                <p>para enviar el formulario corrige los errores</p>
                                )
                            }
                            
                        </div>
                </div>
            </div>
            
        </div>
    )
}
