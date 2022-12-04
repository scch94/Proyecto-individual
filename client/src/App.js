import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Perros } from './components/perros/Perros';
import * as actions from './redux/actions/index'

function App() {
  let dispatch=useDispatch()
  useEffect(()=>{
    console.log("si entro")
    dispatch(actions.getDogs())
  },[dispatch])
  return (
    <>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
        <Route exact path='/dogs' element={<Perros/>}/>
      </Routes>
    </>
  );
}

export default App;
