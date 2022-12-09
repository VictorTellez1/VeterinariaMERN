import React from 'react'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clientesAxios from '../../config/axios'
const OlvidePassword = () => {
    const [email,setEmail]=useState('')
    const [alerta,setAlerta]=useState('')
    const handleSubmit=async e=>{
        e.preventDefault()
        if(email==="" || email.length < 6){
            setAlerta({
                msg:"El correo es obligatorio",
                error:true
            })
            return
        }
        try {
            const {data}=await clientesAxios.post('/veterinarios/olvide-password',{email})
            setAlerta({
                msg:data.msg,
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
                        Recupera tu password y administra tus 
                        <span className='text-black'> Pacientes</span>
                    </h1>
                </div>
                <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
                    {msg && <Alerta alerta={alerta}/>}
                    <form
                        onSubmit={handleSubmit}
                    >
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
                                onChange={e=>setEmail(e.target.value)}
                            />
                        </div>
                        <input 
                            type="submit"
                            value="Recuperar Passowrd"
                            className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10'
                        />
                    </form>
                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link className='block my-5 text-center' to={'/'}>¿Ya tienes un cuenta? Inicia Sesion</Link>
                        <Link className='block my-5 text-center' to={'/olvide-password'}>¿No tiene una cuenta? Registrate</Link>
                    </nav>
                </div>
            
        </>
      )
}

export default OlvidePassword