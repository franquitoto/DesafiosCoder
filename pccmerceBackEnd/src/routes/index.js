import { Router } from 'express';
import Productos from './productos';
import Usuarios from './usuarios';



export default class MainRouter {
  constructor() { }

  static start() {
    const router = Router();
    const productos = new Productos();
    const usuarios = new Usuarios();
    

    router.use('/productos', productos.start());
    router.use("/usuarios", usuarios.start());
   
    return router;
  }
}