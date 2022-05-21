import { producsModel } from "../models/productos";
import { NextFunction, Request, Response } from 'express';

export const save = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const newProduct = await producsModel.create({
            titulo: body.titulo,
            precio: body.precio
        });
        console.log(newProduct)
        res.json({
            newProduct
        })
    } catch (err) {
        console.log(err)
    }
}
export const getAll = async (req: Request, res: Response) => {
    try {
        const productos = await producsModel.find();
        res.json({
            productos
        });
    } catch (err) {
        console.log("error")
        res.json({
            error: "ocurrio un error inesperado"
        })
    }
}
export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const producto = await producsModel.findById(id);

        if (!producto)
            return res.status(400).json({
                msg: 'El producto no existe'
            });
        res.json({
            data: producto
        })
    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({
                error: err.message,
                stack: err.stack,
            });
    }
}
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const  body  = req.body;
        console.log(body.titulo)
        const producto = await producsModel.findById(id);

        if (!producto)
            return res.status(400).json({
                msg: 'El producto no existe'
            });
        const productoActualizado = await producsModel.findByIdAndUpdate(
            id,
            { titulo: body.titulo, precio: body.precio },
            { new: true }
        );
        res.json({
            msj: 'producto actualizado',
            data: productoActualizado
        })
    }catch(err){
        if (err instanceof Error)
            res.status(500).json({
                error: err.message,
                stack: err.stack,
            });
    }
}
export const deleteById = async (req: Request, res: Response) =>{
    try {
        const { id } = req.params;

        const producto = await producsModel.findById(id);

        if (!producto)
            return res.status(400).json({
                msg: 'El producto no existe'
            });
        const eliminado = await producsModel.findByIdAndDelete(id);
        res.json({
            msj: "Producto eliminado correctamente",
            data: eliminado
        })
    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({
                error: err.message,
                stack: err.stack,
            });
    }
}