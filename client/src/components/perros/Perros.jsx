import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Perro } from '../perro/Perro'
import s from './perros.module.css'

export const Perros = () => {
    //buscador
    let [buscar,setBuscar]=useState("")
    let [busquedaPor,setBusquedaPor]=useState("elige")
    //paginacion
    let rasas=useSelector(state=>state.dogs)
    const [items,setItems]=useState([...rasas])
    const [rasase,setRasase]=useState([...rasas].splice(0,8))
    const [paginaActual,setPaginaActual]=useState(0);
    //ordenar
    let [ordenamiento,setordenamiento]=useState("")
    function ordenar(){
        console.log(ordenamiento)
        let orden
        //dependiendo de que variable este en ordenamiento se activara algun orden 
        //utilizamos el metodo sort para ordenar los objetos
        if(ordenamiento==="Alfabetico [A-Z]"){
            orden=items.sort((a,b)=>{
                if(a.name<b.name)return -1
                if(a.name>b.name)return 1
                return 0
            })
            
        }
        if(ordenamiento==="Alfabetico [Z-A]"){
            orden=items.sort((a,b)=>{
                if(a.name>b.name)return -1
                if(a.name<b.name)return 1
                return 0
            })
        }
        if(ordenamiento==="Peso [menor-mayor]"){

            orden=items.sort((a,b)=>{
                if(a.weight<b.weight)return -1
                if(a.weight>b.weight)return 1
                return 0
            })
        }
        if(ordenamiento==="Peso [mayor-menor]"){
            orden=items.sort((a,b)=>{
                if(a.weight>b.weight)return -1
                if(a.weight<b.weight)return 1
                return 0
            })
        }
        //setiamos la pagina actual a 0 para que inicie de nuevo el paginado 
        setPaginaActual(0)
        setRasase([...orden].splice(0,8))   
    }
    //funcion para ir a la siguiente pagina 
    function nextPage(){
        //pagina final nos permitira identificar cual es la ultima pagina que 
        //tiene 8 elemetnos completos
        const paginaFinal=Math.floor(items.length/8)
        const nextPage=paginaActual+1
        const primerindice=nextPage*8
        //esto nos permitira 
        // if(items.length%8===0){
        //     if(nextPage===paginaFinal)return
        // }
        if(nextPage===paginaFinal+1){
            return
        };
        setRasase([...items].splice(primerindice,8))
        setPaginaActual(nextPage)
    }
    function prevPage(){
        const prevPage=paginaActual-1
        const primerindice=prevPage*8
        if(prevPage===-1)return
        setRasase([...items].splice(primerindice,8))
        setPaginaActual(prevPage)
    }
    function handleChange(e){
        if(busquedaPor==="elige")return
        setBuscar(e.target.value)
        console.log(e.target.value)
        console.log(busquedaPor)
        let buscador=rasas.filter(a=>{
            if(!a[busquedaPor]){
                return false
            }
            let comp=a[busquedaPor].toLowerCase()
            return comp.includes(e.target.value)
        })
        setPaginaActual(0)
        setRasase([...buscador].splice(0,8))
        setItems([...buscador])
    }
    return (
        <>
            <div>
                pagina actual ={paginaActual+1}
                <div>
                    <button onClick={ordenar}>ORDEN</button>
                    <select name="ordenamiento" value={ordenamiento} onChange={(e)=>setordenamiento(e.target.value)}>
                        <option value="Alfabetico [Z-A]" key={2}>Alfabetico [Z-A]</option>
                        <option value="Alfabetico [A-Z]" key={1}>Alfabetico [A-Z]</option>
                        <option value="Peso [menor-mayor]" key={3}>Peso [menor-mayor]</option>
                        <option value="Peso [mayor-menor]" key={4}>Peso [mayor-menor]</option>
                    </select>
                    {" "}
                    <button onClick={prevPage}>ANTERIOR</button>
                    <button onClick={nextPage}>SIGUIENTE</button>
                    {" "}
                    {
                        busquedaPor==="elige"?null:(<input type="text" name='buscar' value={buscar} onChange={(e)=>handleChange(e)} placeholder="buscar por"/>)
                    }
                    
                    <select name="busquedaPor" value={busquedaPor} onChange={(e)=>setBusquedaPor(e.target.value)}>
                        <option value="elige" key={7}>elige por que quieres ordenar</option>
                        <option value="name" key={5}>nombre</option>
                        <option value="temperament" key={6}>temperamento</option>
                    </select>
                    
                </div>
                <div className={s.contenedor}>
                    <h1>razas</h1>
                    <div className={s.ventas}>
                        {
                            rasase.map(r=><Perro key={r.id} id={r.id} image={r.image} name={r.name} temperament={r.temperament} weight={r.weight}/>)
                            // ventas.map((v,i)=><Venta venta={v} index={i}/>)
                        }
                    </div>
                </div>
            </div>
        </>
        
    )
}
