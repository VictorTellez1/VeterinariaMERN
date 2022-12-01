import express from 'express'
import conectarDB from './config/db.js';
import dotenv from 'dotenv'
const app=express(); //Funcionalidad para crear el servidor
dotenv.config()
conectarDB()

app.use("/",(req,res)=>{
    res.send("Hola")
})

const PORT=process.env.PORT || 4000 

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})