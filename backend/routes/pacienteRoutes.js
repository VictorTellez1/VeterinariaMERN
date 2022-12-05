import express from 'express'
import checkAuth from "../middleware/authMiddleware.js";
const router=express.Router()
import {agregarPaciente,obtenerPacientes,obtenerPaciente,actualizarPaciente,eliminarPaciente} from '../controllers/pacienteController.js'
router.route('/')
    .post(checkAuth,agregarPaciente)
    .get(checkAuth,obtenerPacientes)

router
    .route('/:id')
    .get(checkAuth,obtenerPaciente)
    .put(checkAuth,actualizarPaciente)
    .delete(checkAuth,eliminarPaciente)



export default router;