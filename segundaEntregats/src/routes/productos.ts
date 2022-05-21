import { Router, Response, Request } from "express";
import { save, getAll, getById, updateProduct, deleteById } from "../controllers/productos";

const router = Router();

router.get('/', getAll)
router.post('/', save);
router.get('/:id', getById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteById);
export default router;