import Veterinario from "../models/Veterinario.js";

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
        res.json({msg:veterinarioGuardado})
    } catch (error) {
        console.log(error.message)
    }
};
const perfil=(req,res)=>{
    res.json({msg:"Mostrando perfil"})
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

export {
    registrar,
    perfil,
    confirmar
}