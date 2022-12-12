import {useState,useEffect,createContext} from 'react'
import clientesAxios from '../../config/axios'
import Alerta from '../components/alerta'
const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [cargando,setCargando]=useState(true)
    const [auth,setAuth]=useState({})
    const [alertaProvider,setAlerta]=useState('')
    useEffect(()=>{
        const autenticarUsuario=async ()=>{
            const token=localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            const config={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            try {
                const {data}=await clientesAxios('/veterinarios/perfil',config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    },[])
    const cerrarSesion=()=>{
        localStorage.removeItem('token')
        setAuth({})
    }
    const actualizarPerfil=async(datos)=>{
        const token=localStorage.getItem('token')
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const url=`/veterinarios/perfil/${datos._id}`
            const {data}=await clientesAxios.put(url,datos,config)
            return{
                msg:"Cambios almacenados correctamente",
                error:false
            }
        } catch (error) {
            return{
                msg:error.response.data.msg,
                error:true
            }
        }
    }
    const guardarPassword=async (datos)=>{
        const token=localStorage.getItem('token')
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const url='/veterinarios/actualizar-password'
            const {data}=await clientesAxios.put(url,datos,config)
            return{
                msg:data.msg
            }
        } catch (error) {
            return{
                msg:error.response.data.msg,
                error:true
            }
        }
      }
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                alertaProvider,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext