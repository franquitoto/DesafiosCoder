import { Router, Response, Request } from "express";
import { crearCarrito } from "../controllers/carrito";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    msg: "Hola desde carrito",
  })
})
router.post('/', crearCarrito)

export default router;