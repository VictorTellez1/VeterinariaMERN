import React from 'react'
import { useState,useEffect } from 'react'
import {useParams,Link} from 'react-router-dom'
import clientesAxios from '../../config/axios'
import Alerta from '../components/Alerta'
const NuevoPassword = () => {
    const [password,setPassword]=useState('')
    const [alerta,setAlerta]=useState('')
    const [tokenValido,setTokenValido]=useState(false)
    const [passwordModifcado,setPasswordModificado]=useState(false)
    const params=useParams()
    const {token}=params;
    const handleSubmit=async e=>{
        e.preventDefault()
        if(password.length < 6){
            setAlerta({
                msg:"El password debe ser minimo de 6 caracteres",
                error:true
            })
            return
        }
        try {
            const url=`/veterinarios/olvide-password/${token}`
            const {data}=await clientesAxios.post(url,{password})
            setAlerta({
                msg:data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }

    }
    useEffect(()=>{
        const comprobarToken=async()=>{
            try {
                await clientesAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg:"Coloca tu nuevo password",
                    error:false
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg:"Hubo un error con el enlace",
                    error:true
                })
            }
        }
        comprobarToken()
    },[])
    const {msg}=alerta
  return (
    <>
        <div>
            <h1 className='text-indigo-600 font-black text-6xl'>
                Restablece tu password y administra tus 
                <span className='text-black'> Pacientes</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
        {  msg && <Alerta
            alerta={alerta}
        />}
            {tokenValido && (
               <>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='my-5'>
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >Nuevo Password
                        </label>
                        <input
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            type="password"
                            placeholder='Tu password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Guardar nuevo Password"
                        className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10'
                    />
                </form>
                 {passwordModifcado && (
                     <Link className='block my-5 text-center' to={'/'}>¿Ya tienes un cuenta? Inicia Sesion</Link>
                 )}
                 </> 
            )}
        </div>
    </>
    
)
}

export default NuevoPassword