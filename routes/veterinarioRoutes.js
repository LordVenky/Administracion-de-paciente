import express from 'express';
const router = express.Router();
import {
     registrar,
     perfil, 
     confirmar,
     autenticar,
     olvidePassword,
     comprobarToken,
     nuevoPassword,
} from "../controllers/veterianoController.js"
import checkAuth from '../middleware/authMiddleware.js';

// url public
router.post("/", registrar); // registrar usuario
router.get("/confirmar/:token", confirmar); // confirmar cuenta
router.post('/login', autenticar); // iniciar sesion
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// url private
router.get("/perfil", checkAuth, perfil); // ver perfil


export default router;