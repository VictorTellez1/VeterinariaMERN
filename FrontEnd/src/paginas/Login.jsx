import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'
import clientesAxios from '../../config/axios'

const Login = () => {
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [alerta,setAlerta]=useState('')
    const navigate=useNavigate()
    const {setAuth}=useAuth()
    const handleSubmit=async e=>{
       e.preventDefault()
        if([email,password].includes('')){
            setAlerta({
                msg:"Todos los campos son obligatorios",
                error:true
            })
            return
        }
        try {
            const {data}=await clientesAxios.post('/veterinarios/login',{email,password})
            setAuth(data)
            localStorage.setItem('token',data.token)
            navigate('/admin')
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
                    Inicia Sesion y administra tus 
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
                            placeholder='Password de registro'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
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