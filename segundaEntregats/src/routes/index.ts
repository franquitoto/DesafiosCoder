import { Router} from "express";
import routerProductos from './productos';
import routerCarrito from './carrito';

const router = Router();

router.use('/Productos', routerProductos);
router.use('/Carrito', routerCarrito);

export default router;