import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
          <Route index element={<Login/>}/>
          <Route path="registrar" element={<Registrar/>}/>
          <Route paht="olvide-password" element={<OlvidePassword/>}/>
          <Route paht="confirmar-cuenta" element={<ConfirmarCuenta/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
