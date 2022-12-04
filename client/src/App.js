import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Crear } from './components/crear/Crear';
import { Error404 } from './components/error/Error404';
import { Home } from './components/Home/Home';
import { Navbar } from './components/navbar/Navbar';
import { Perros } from './components/perros/Perros';
import { Raza } from './components/raza/Raza';
import * as actions from './redux/actions/index'

function App() {
  let dispatch=useDispatch();
  useEffect(()=>{
    dispatch(actions.getDogs())
    dispatch(actions.getTemperaments())
  },[dispatch])
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
        <Route exact path='/dogs' element={<Perros/>}/>
        <Route exact path='/raza/:id' element={<Raza/>}/>
        <Route exact path='/crear' element={<Crear/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </>
  );
}

export default App;
