import express from 'express'
import conectarDB from './config/db.js';
import dotenv from 'dotenv'
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js'
import cors from 'cors'

const app=express(); //Funcionalidad para crear el servidor
app.use(express.json())
dotenv.config()
conectarDB()

const dominiosPermitidos=["http://127.0.0.1:5173"]

const corsOptions={
    origin:function(origin,callback){
        if(dominiosPermitidos.indexOf(origin)!==-1){ //-1 no lo encontro
            //El origin del Request esta permitido
            callback(null,true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use("/api/veterinarios",veterinarioRoutes)
app.use("/api/pacientes",pacienteRoutes)

const PORT=process.env.PORT || 4000 

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})