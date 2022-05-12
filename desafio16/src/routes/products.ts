import { Router, Request, Response } from "express";
import { getAllProducts, createProduct } from '../controller/products';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
	const data = await getAllProducts();
	res.json({
		msg: "Get all porducts",
		data
	})
})

router.post('/', async (req: Request, res: Response) => {
	const {name, stock, price} = req.body;
	const newProduct = await createProduct(name, stock, price);
	res.json({
		msg: "POST a product",
		newProduct
	})
})

router.put('/:id', (req: Request, res: Response) => {
	res.json({
		msg: "Modify a product"
	})
})

router.delete('/:id', (req: Request, res: Response) => {
	res.json({
		msg: "Delete product"
	})
})

export default router;