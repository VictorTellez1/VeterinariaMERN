import React from 'react'
import {useParams,Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import clientesAxios from '../../config/axios'
import Alerta from '../components/Alerta'
const ConfirmarCuenta = () => {
  const params=useParams()
  const [cuentaConfirmada,setCuentaConfirmada]=useState(false)
  const [cargando,setCargando]=useState(true)
  const [alerta,setAlerta]=useState("")
  const {id}=params

  useEffect(()=>{
    const confirmarCuenta=async()=>{
      try {
        const url=`/veterinarios/confirmar/${id}`
        const {data}=await clientesAxios(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg:data.msg,
        })
      } catch (error) {
        setAlerta({
          error:true,
          msg:error.response.data.msg
        })
      }finally{
        setCargando(false)
      }
    }
    confirmarCuenta()
  },[])
  return (
    <>
      <div>
        <h1 className='text-indigo-600 font-black text-6xl'>
          Confirma y tu cuenta y administra tus 
          <span className='text-black'> Pacientes</span>
        </h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
        {!cargando && <Alerta 
          alerta={alerta}
        />}
        {cuentaConfirmada && (
           <Link className='block my-5 text-center' to={'/'}>Inicia Sesion</Link>
        )}
      </div>
    </>
  )
}

export default ConfirmarCuenta