
import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
const registrar=async (req,res)=>{
    const {nombre,email,password}=req.body

    //Prevenir que un usuario ya este registrado
    const existeUsuario=await Veterinario.findOne({email})
    if(existeUsuario){
        const error=new Error("Usuario ya registrado")
        return res.status(400).json({msg:error.message})
    }
    try {
        //Guardar un nuevo veterinario
        const veterinario=new Veterinario(req.body)
        const veterinarioGuardado=await veterinario.save()
        //Enviar el email
        emailRegistro({email,nombre,token:veterinarioGuardado.token})
        res.json({msg:veterinarioGuardado})
    } catch (error) {
        console.log(error.message)
    }
};
const perfil=(req,res)=>{
    const {veterinario}=req
    res.json({perfil:veterinario})
}
const confirmar=async (req,res)=>{
    const {token}=req.params
    const usuarioConfirmar=await Veterinario.findOne({token})
    if(!usuarioConfirmar){
        const error=new Error('Token no valido')
        return res.status(404).json({msg:error.message})
    }
    try {
        usuarioConfirmar.token=null
        usuarioConfirmar.confirmado=true
        await usuarioConfirmar.save()
        res.json({msg:"Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error)
    }
   
}
const autenticar=async(req,res,next)=>{
    const {email,password}=req.body
    //Comprobar si el usuario existe
    const usuario=await  Veterinario.findOne({email})
    if(!usuario){
        const error=new Error("El uusario no esta registrado")
        return res.status(401).json({msg:error.message})
    }
    //COnfirmar si el usuario esta confirmado o no
    if(!usuario.confirmado){
        const error=new Error("La cuenta no esta confirmada")
        return res.status(403).json({msg:error.message})
    }
    //Revisar el password
    if(!await usuario.comprobarPassword(password)){
        const error=new Error('Password Incorrecto intentelo nuevamente')
        return res.status(404).json({msg:error.message})
    }
    res.json({token:generarJWT(usuario.id)})
}

const olvidePassword= async(req,res,next) =>{
    const {email}=req.body
    const existeVeterinario=await Veterinario.findOne({email})
    if(!existeVeterinario){
        const error=new Error("El usuario no existe")
        return res.status(400).json({msg:error.message})
    }
    try {
        existeVeterinario.token=generarId()
        await existeVeterinario.save()
        res.json({msg:"Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }
}
const comprobarToken=async(req,res,next)=>{
    const {token}=req.params
    const tokenValido=await Veterinario.findOne({token})
    if(tokenValido){
        //El token es valido, el usuario existe 
        res.json({msg:"Token valido y el usuario existe"})
        
    }else{
        const error=new Error('El token no es valido')
        return res.status(400).json({msg:error.message})
    }
}
const nuevoPassword=async(req,res,next)=>{
    const {token}=req.params
    const {password}=req.body
    const veterinario=await Veterinario.findOne({token})
    if(!veterinario){
        const error=new Error('Hubo un error')
        return res.status(400).json({msg:error.message})
    }
    try {
        veterinario.token=null
        veterinario.password=password
        await veterinario.save()
        res.json({msg:"Contraseña cambiada correctamente"})
    } catch (error) {
        console.log(error)
    }

}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}