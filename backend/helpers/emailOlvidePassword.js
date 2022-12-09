import nodemailer from 'nodemailer'

const emailOlvidePassword=async(datos)=>{
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
        subject:'Reestablece tu Password',
        text:'Reestablece tu Password',
        html:`<p>Sigue el siguiente enlace para generar un nuevo password: ${nombre}, comprueba tu cuenta en APV.</p>
        <p>Tu cuenta ya esta lista, solo debes confirmala en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a></p>
        <p> Si tu no creaste esta cuenta puedes ignorar este mensaje </p>`
    })
    console.log("Enviado: %s",info.messageId)

}

export default emailOlvidePassword