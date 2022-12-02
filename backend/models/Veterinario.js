import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from 'bcrypt'
const veterinarioSchema =mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    telefono:{
        type:String,
        default:null,
        trim:true
    },
    web:{
        type:String,
        default:null,
    },
    token:{
        type:String,
        default:generarId(),
    },
    confirmado:{
        type:Boolean,
        default:false
    }
})

veterinarioSchema.pre('save',function (){
    
})

const Veterinario=mongoose.model('Veterinario',veterinarioSchema)

export default Veterinario
