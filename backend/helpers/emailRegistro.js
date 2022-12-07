import nodemailer from 'nodemailer'

const emailRegistro=async(datos)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    //Enviar el email
    const {email,nombre,token}=datos;
    const info=await transporter.sendMail({
        from:"APV - Administrador de paciente de veterinaria",
        to:email,
        subject:'Confirma tu cuenta en APV',
        text:'Comprueba tu cuenta en APV',
        html:`<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
        <p>Tu cuenta ya esta lista, solo debes confirmala en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>
        <p> Si tu no creaste esta cuenta puedes ignorar este mensaje </p>`
    })
    console.log("Enviado: %s",info.messageId)

}

export default emailRegistro