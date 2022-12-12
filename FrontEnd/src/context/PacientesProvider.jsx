import {createContext,useState,useEffect} from 'react'
import clientesAxios from '../../config/axios'
import useAuth from '../hooks/useAuth'
const PacientesContext=createContext()

const PacientesProvider=({children}) =>{
    const {auth}=useAuth()
    const [pacientes,setPacientes]=useState([])
    const [paciente,setPaciente]=useState({})
    useEffect(()=>{
        const obtenerPacientes=async()=>{
            try {
                const token=localStorage.getItem('token')
                if(!token) return
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                }
                const {data}=await clientesAxios('/pacientes',config)
                setPacientes(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    },[auth])
    const guardarPaciente = async(paciente) =>{
        const token=localStorage.getItem('token')
        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        if(paciente.id){
            try {
                const {data}=await clientesAxios.put(`/pacientes/${paciente.id}`,paciente,config)   
                const pacientesActualizado=pacientes.map(pacienteState=>pacienteState._id===data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const {data}=await clientesAxios.post('/pacientes',paciente,config)
                const {createdAt,updatedAt,__v,...pacienteAlmacenado}=data
                setPacientes([pacienteAlmacenado,...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        } 
    }
    const eliminarPaciente=async id=>{
        const confirmar=confirm('¿Deseas eliminar este paciente?')
        if(confirmar){
            const token=localStorage.getItem('token')
            try {
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                }
                const {data}=await clientesAxios.delete(`pacientes/${id}`,config)
                const pacientesActualizado=pacientes.filter(pacientesState=>pacientesState._id!==id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    const setEdicion=paciente=>{
        setPaciente(paciente)
    }
    return(
      <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}
      >
        {children}
      </PacientesContext.Provider>  
    )
}

export {
    PacientesProvider,
    
}

export default PacientesContext