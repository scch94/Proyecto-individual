import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './crear.module.css'
import { Perro } from '../perro/Perro'
import * as actions from '../../redux/actions/index'

export const Crear = () => {
    let [temp,setTemp]=useState([])
    let [imagen,setImagen]=useState("")
    let [activar,setActivar]=useState(false)
    let [temperament,setTemperament]=useState([])
    let [input,setInput]=useState({name:"", heightMin:0,heightMax:0, weightMin:0,weightMax:0, life_span:"", temperament:""})
    let [error,setError]=useState({name:"", heightMin:"", weightMin:"", life_span:"", temperament:""})
    let temperamentos=useSelector(state=>state.temperaments)
    let dispatch=useDispatch();
    function handleChange(e){
        e.preventDefault();
        setInput((prev)=>({...prev,[e.target.name]:e.target.value}))
        //validacion nombre que no sea menor a 2 ni mayor a 15
        if(e.target.name==="name"){
            if(!/^[\s\S]{3,15}$/.test(e.target.value)) {
                setError((prev)=>({...prev,name:"el nombre debe tener entre 2 y 15 letras"}));
            } else {
                setError((prev)=>({...prev,[e.target.name]:""}));
            }
        }
        //validando que el peso minimo no pueda ser mayores al maximo 

        if(e.target.name==="heightMin"||e.target.name==="heightMax"){
            if(parseInt(input.heightMin)>parseInt(input.heightMax)){
                console.log(parseInt(input.heightMin)+" "+parseInt(input.heightMax))
                setError((prev)=>({...prev,heightMin:"el valor minimo debe ser inferior al maximo"}));
            }else{
                setError((prev)=>({...prev,heightMin:""}));
            }
        }
        //validando que la altura minima no pueda ser mayyor al maximo
        if(e.target.name==="weightMin"||e.target.name==="weightMax"){
            if(parseInt(input.weightMin)>parseInt(input.weightMax)){
                setError((prev)=>({...prev,weightMin:"el valor minimo debe ser inferior al maximo"}));
            }else{
                setError((prev)=>({...prev,weightMin:""}));
            }
        }
        //validando que la edad sea mayor a 0
        if(e.target.name==="life_span"){
            if(parseInt(input.life_span)<=0){
                setError((prev)=>({...prev,life_span:"el valor del promedio de edad debe ser un numero mayor a 0"}));
            }else{
                setError((prev)=>({...prev,life_span:""}));
            }
        }
    };
    function agregarTemperamentos(e){
        e.preventDefault();
        let f=[input.temperament]
        setTemperament((prev)=>[...prev,...f])
    }
    function crear(e){
        e.preventDefault()
        let temperamento
        temperamento=temperament
        const set = new Set(temperamento);
        temperamento = [...set];
        temperamento=temperamento.toString()
        setTemp(temperamento)
        let datos={
            name:input.name,
            height:`entre ${input.heightMin} y ${input.heightMax}`,
            weight:`entre ${input.weightMin} y ${input.weightMax}`,
            life_span:input.life_span,
            id:300,
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
        dispatch(actions.postRaza({id:300,name:input.name,temperament:temperamento,weight:`entre ${input.weightMin} y ${input.weightMax}`,image:imagen}))
    }
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
        <>  
            <div className={s.contenedor}>
                {
                    activar===true?<Perro key={300} id={300} image={imagen} name={input.name} temperament={temp} weight={`entre ${input.weightMin} y ${input.weightMax}`}/>:null
                }   
                <div className={s.contenedor_formulario}>
                    <form>
                        <div>
                            <label >Nombre</label>
                            <br />
                            <input type="text" name='name' value={input.name} onChange={(e)=>handleChange(e)}/>
                        </div>
                        {
                            error.name===""?<br />:<p>{error.name}</p>
                        }
                        <div>
                            <label >Altura</label>
                            <br />
                            <label >min</label>
                            <input type="number" name='heightMin' value={input.heightMin} onChange={(e)=>handleChange(e)}/>
                            <label >max</label>
                            <input type="number" name='heightMax' value={input.heightMax} onChange={(e)=>handleChange(e)}/>
                        </div>
                        {
                            error.heightMin===""?(<br />):(<p>{error.heightMin}</p>)
                        }
                        <div>
                            <label>Peso</label>
                            <br />
                            <label >min</label>
                            <input type="number" name='weightMin' value={input.weightMin} onChange={(e)=>handleChange(e)}/>
                            <label >max</label>
                            <input type="number" name='weightMax' value={input.weightMax} onChange={(e)=>handleChange(e)}/>
                        </div>
                        {
                            error.weightMin===""?(<br />):(<p>{error.weightMin}</p>)
                        }
                        <div>
                            <label>Años de vida</label>
                            <input type="number" name='life_span'value={input.life_span} onChange={(e)=>handleChange(e)}/>
                        </div>
                        {
                            error.life_span===""?(<br />):(<p>{error.life_span}</p>)
                        }
                        <div>
                            <label >temperamento</label>
                            <select name="temperament" value={input.temperament} onChange={(e)=>handleChange(e)}>
                                {
                                    temperamentos.map((t,i)=><option value={t} key={i}>{t}</option>)
                                }
                            </select>
                            {" "}
                            <button onClick={(e)=>agregarTemperamentos(e)}>agregar temperamento</button>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="">img</label>
                            <input type="text" id="imagen"value={imagen} onChange={(e=>setImagen(e.target.value))} />
                        </div>
                        <br />
                        <div>
                            {
                                JSON.stringify(error)===JSON.stringify({name:"", heightMin:"", weightMin:"", life_span:"", temperament:""})?(
                                <>
                                <button  onClick={(e)=>crear(e)}>enviar</button>
                                {" "}
                                <button onClick={(e)=>observar(e)}>pre-vizualisar</button>
                                </>):(
                                <p>para enviar el formulario corrige los errores</p>
                                )
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
            
        </>
    )
}
