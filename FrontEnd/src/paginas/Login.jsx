import React from 'react'
import {Link} from 'react-router-dom'
const Login = () => {
  return (
    <>
       
            <div>
                <h1 className='text-indigo-600 font-black text-6xl'>
                    Inicia Sesion y administra tus 
                    <span className='text-black'> Pacientes</span>
                </h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
                <form>
                    <div className='my-5'>
                        <label
                            className='uppercase text-gray-600 block text-xl font-bold'
                        >Email
                        </label>
                        <input
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                            type="email"
                            placeholder='Email de registro'
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
                            placeholder='Password de registro'
                        />
                    </div>
                    <input 
                        type="submit"
                        value="Iniciar Sesion"
                        className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10'
                    />
                </form>
                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='block my-5 text-center' to={'/registrar'}>¿No tienes un cuenta? Registrate</Link>
                    <Link className='block my-5 text-center' to={'/olvide-password'}>¿Olvidaste tu password? Recuperalo</Link>
                </nav>
            </div>
        
    </>
  )
}

export default Login