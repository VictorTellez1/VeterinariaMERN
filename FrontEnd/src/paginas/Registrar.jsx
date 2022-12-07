import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clientesAxios from '../../config/axios'
import axios from 'axios'
const Registrar = () => {
    const [nombre,setNombre]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [passwordRepetir,setPasswordRepetir]=useState('')
    const [alerta,setAlerta]=useState('')
    const handleSubmit=async (e)=>{
        e.preventDefault()
        if([nombre,email,password,passwordRepetir].includes('')){
            setAlerta({msg:"Hay campos vacios",error:true})
            return
        }
        if(password!==passwordRepetir){
            setAlerta({msg:"Los password deben de ser iguales",error:true})
            return
        }
        if(password.length < 8){
            setAlerta({msg:"El password es demasiado corto, debe contener minimo 6 caracteres",error:true})
        }
        setAlerta('')
        //Crear el usuario en la api
        try {
            const url=`/veterinarios`
            await clientesAxios.post(url,{nombre,email,password})
            setAlerta({
                msg:'Creado Correctamente, revisa tu email',
                error:false
            })
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }
    }
    const {msg}=alerta
    return (
        <>
           
                <div>
                    <h1 className='text-indigo-600 font-black text-6xl'>
                        Registrate y administra tus 
                        <span className='text-black'> Pacientes</span>
                    </h1>
                </div>
                <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
                    {msg && <Alerta
                        alerta={alerta}
                    />}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className='my-5'>
                            <label
                                className='uppercase text-gray-600 block text-xl font-bold'
                            >Nombre
                            </label>
                            <input
                                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                                type="nombre"
                                placeholder='Tu nombre'
                                value={nombre}
                                onChange={(e)=>setNombre(e.target.value)}
                            />
                        </div>
                        <div className='my-5'>
                            <label
                                className='uppercase text-gray-600 block text-xl font-bold'
                            >Email
                            </label>
                            <input
                                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                                type="email"
                                placeholder='Email de registro'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className='my-5'>
                            <label
                                className='uppercase text-gray-600 block text-xl font-bold'
                            >Password
                            </label>
                            <input
                                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                                type="password"
                                placeholder='Tu password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div className='my-5'>
                            <label
                                className='uppercase text-gray-600 block text-xl font-bold'
                            >Repetir Password
                            </label>
                            <input
                                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                                type="password"
                                placeholder='Repite tu password'
                                value={passwordRepetir}
                                onChange={(e)=>setPasswordRepetir(e.target.value)}
                            />
                        </div>
                        <input 
                            type="submit"
                            value="Registrarte"
                            className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10'
                        />
                    </form>
                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link className='block my-5 text-center' to={'/'}>¿Ya tienes un cuenta? Inicia Sesion</Link>
                        <Link className='block my-5 text-center' to={'/olvide-password'}>¿Olvidaste tu password? Recuperalo</Link>
                    </nav>
                </div>
            
        </>
      )
}

export default Registrar