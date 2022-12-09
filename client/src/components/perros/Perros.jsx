import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Perro } from '../perro/Perro'
import s from './perros.module.css'

export const Perros = () => {
    //buscador
    let [buscar, setBuscar] = useState("")
    let [busquedaPor, setBusquedaPor] = useState("name")
    //paginacion
    let rasas = useSelector(state => state.dogs)
    const [items, setItems] = useState([...rasas])
    const [rasase, setRasase] = useState([...rasas].splice(0, 8))
    const [paginaActual, setPaginaActual] = useState(0);
    //ordenar
    let [ordenamiento, setordenamiento] = useState("Alfabetico [A-Z]")
    function ordenar() {
        console.log(ordenamiento)
        let orden
        //dependiendo de que variable este en ordenamiento se activara algun orden 
        //utilizamos el metodo sort para ordenar los objetos
        if (ordenamiento === "Alfabetico [A-Z]") {
            console.log("orden ",items)
            orden = items.sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
            })

        }
        if (ordenamiento === "Alfabetico [Z-A]") {
            orden = items.sort((a, b) => {
                if (a.name > b.name) return -1
                if (a.name < b.name) return 1
                return 0
            })
        }
        if (ordenamiento === "Peso [menor-mayor]") {

            orden = items.sort((a, b) => {
                if (a.weight < b.weight) return -1
                if (a.weight > b.weight) return 1
                return 0
            })
        }
        if (ordenamiento === "Peso [mayor-menor]") {
            orden = items.sort((a, b) => {
                if (a.weight > b.weight) return -1
                if (a.weight < b.weight) return 1
                return 0
            })
        }
        //setiamos la pagina actual a 0 para que inicie de nuevo el paginado 
        setPaginaActual(0)
        console.log(orden)
        setRasase([...orden].splice(0, 8))
    }
    //funcion para ir a la siguiente pagina 
    function nextPage() {
        //pagina final nos permitira identificar cual es la ultima pagina que 
        //tiene 8 elemetnos completos
        const paginaFinal = Math.floor(items.length / 8)
        const nextPage = paginaActual + 1
        const primerindice = nextPage * 8
        //esto nos permitira que si son 8 en la ultima pagina no pase a la siguiente
        if (items.length % 8 === 0 && paginaActual + 1 === paginaFinal) {
            console.log(paginaActual)
            if (nextPage === paginaFinal) return
        }
        if (nextPage === paginaFinal + 1) {
            return
        };
        setRasase([...items].splice(primerindice, 8))
        setPaginaActual(nextPage)
    }
    function prevPage() {
        const prevPage = paginaActual - 1
        const primerindice = prevPage * 8
        if (prevPage === -1) return
        setRasase([...items].splice(primerindice, 8))
        setPaginaActual(prevPage)
    }
    function handleChange(e) {
        if (busquedaPor === "elige") return
        setBuscar(e.target.value)
        console.log(e.target.value)
        console.log(busquedaPor)
        let buscador = rasas.filter(a => {
            if (!a[busquedaPor]) {
                return false
            }
            let comp = a[busquedaPor].toLowerCase()
            return comp.includes(e.target.value)
        })
        setPaginaActual(0)
        setRasase([...buscador].splice(0, 8))
        setItems([...buscador])
    }
    return (
        <>
            <div className={s.todo}>
                <div className={s.buscadore}>
                    <div className={s.ordena}>
                        <button onClick={ordenar}>ORDEN</button>
                        <div className={s.inputas}>
                            <div>
                                <input type="radio" name='ordenamiento' value="Alfabetico [Z-A]" onChange={(e) => setordenamiento(e.target.value)} /><span className={s.checkradio}> alfabetico [Z-A]</span>
                            </div>
                            <div>
                                <input type="radio" name='ordenamiento' value="Alfabetico [A-Z]" onChange={(e) => setordenamiento(e.target.value)} /><span className={s.checkradio}> alfabetico [A-Z]</span>
                            </div>
                            <div>
                                <input type="radio" name='ordenamiento' value="Peso [menor-mayor]" onChange={(e) => setordenamiento(e.target.value)} /><span className={s.checkradio}> peso [menor-mayor]</span>
                            </div>
                            <div>
                                <input type="radio" name='ordenamiento' value="Peso [mayor-menor]" onChange={(e) => setordenamiento(e.target.value)} /><span className={s.checkradio}> peso [mayor-menor]</span>
                            </div>
                        </div>
                    </div>


                    <div className={s.lograndolo}>
                        <div className={s.cambio}>
                            <ul className={s.wrapper}>
                                <li onClick={prevPage} className={s.icon}>
                                    <span className={s.tooltip}>Prev</span>
                                    <span><i className="fa fa-chevron-left">  </i></span>
                                </li>
                                <li onClick={prevPage} className={s.icon}>
                                    <span className={s.tooltip}>Page</span>
                                    <span><i>{paginaActual + 1}</i></span>
                                </li>
                                <li onClick={nextPage} className={s.icon}>
                                    <span className={s.tooltip}>Next</span>
                                    <span><i onClick={nextPage} className="fa fa-chevron-right"></i></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={s.busca}>
                        <input type="text" name='buscar' value={buscar} onChange={(e) => handleChange(e)} placeholder="busqueda por ...." />
                        <div className={s.bajar}  >
                            <input type="radio" name='busquedaPor' value="name" onChange={(e) => setBusquedaPor(e.target.value)} /><span className={s.checkradio}>nombre</span>
                            <input type="radio" name="busquedaPor" value="temperament" onChange={(e) => setBusquedaPor(e.target.value)} /><span className={s.checkradio}>temperamento</span>
                        </div>
                        
                        
                    </div>

                </div>
                <div className={s.contenedor}>
                    <div className={s.razas}>
                        {
                            rasase.map(r => <Perro key={r.id} id={r.id} image={r.image} name={r.name} temperament={r.temperament} weight={r.weight} />)
                            // ventas.map((v,i)=><Venta venta={v} index={i}/>)
                        }
                    </div>
                </div>
            </div>
        </>

    )
}
