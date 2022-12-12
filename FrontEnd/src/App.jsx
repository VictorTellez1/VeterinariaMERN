import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import RutaProtegida from './layout/RutaProtegida'
import AdministrarPacientes from './paginas/administrarPacientes'
import { AuthProvider } from './context/authProvider'
import { PacientesProvider } from './context/PacientesProvider'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <AuthProvider>
          <PacientesProvider>
            <Routes>
              <Route path="/" element={<AuthLayout/>}>
                <Route index element={<Login/>}/>
                <Route path="registrar" element={<Registrar/>}/>
                <Route path="olvide-password" element={<OlvidePassword/>}/>
                <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
                <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
              </Route>
              <Route path="/admin" element={<RutaProtegida/>}>
                <Route index element={<AdministrarPacientes/>}/>
                <Route path="perfil" element={<EditarPerfil/>}/>
                <Route path="cambiar-password" element={<CambiarPassword/>}/>

              </Route>

            </Routes>
          </PacientesProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
