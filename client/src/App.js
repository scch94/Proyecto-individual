import { useEffect, } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Crear } from './components/crear/Crear';
import { Error404 } from './components/error/Error404';
import { Footer } from './components/footer/Footer';
import { Home } from './components/Home/Home';
import { Navbar } from './components/navbar/Navbar';
import { Perros } from './components/perros/Perros';
import { Raza } from './components/raza/Raza';
import * as actions from './redux/actions/index'


function App() {
  let dispatch=useDispatch();
  let razas=useSelector(state=>state.dogs)
  useEffect(()=>{
    dispatch(actions.getDogs())
    dispatch(actions.getTemperaments())
  },[dispatch])
  return (
    <>
      <Routes>
        <Route exact path ='/' element={[<Home/>]}/>
        <Route exact path='/dogs' element={[<Navbar/>,<Perros/>,<Footer/>]}/>
        <Route exact path='/raza/:id' element={<Raza razas={razas}/>}/>
        <Route exact path='/crear' element={<Crear/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </>
  );
}

export default App;
