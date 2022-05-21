import { carritoModel } from "../models/carrito";
import { NextFunction, Request, Response } from 'express';
import { getById } from "./productos";

export const crearCarrito = async (req: Request, res: Response) =>{
    try{
        const newCart = await carritoModel.create()
        res.json({
            msj: "Usted a creado un carrito exitosamente",
            data: newCart
        })
    }catch(err){
        if (err instanceof Error)
            res.status(500).json({
                error: err.message,
                stack: err.stack,
            });
    }
}

export const addCarrito = async (req: Request, res: Response) =>{
    const id = req.params
    const productoAgregado = getById(id)
}