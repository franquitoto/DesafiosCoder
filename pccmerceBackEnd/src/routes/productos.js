import express from 'express';
import ControladorProductos from '../controllers/productos';


export default class ProductosRouter {
    constructor() {
        this.productosController = new ControladorProductos();
    }
    
    start() {
        const router = express.Router();

        router.get('/:id?', this.productosController.obtenerProductos)
        router.post('/', this.productosController.guardarProducto)


        return router;
    }

}