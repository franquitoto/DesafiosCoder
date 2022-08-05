import express from 'express';
import ControladorUsuarios from '../controllers/usuarios';


export default class UsuariosRouter {
    constructor() {
        this.usuariosController = new ControladorUsuarios();
    }
    
    start() {
        const router = express.Router();

        
        router.post('/signup', this.usuariosController.guardarUsuario)
        router.post('/login', this.usuariosController.login)


        return router;
    }

}