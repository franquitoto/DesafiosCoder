import productosModel from '../models/productos';
import { logger } from '../services/logger';

export const save = async (data) => {
    try {
        
        const newProduct = await productosModel.create({
            titulo: data.titulo,
            precio: data.precio
        });
        return newProduct
    } catch (error) {
        logger.error("no se pudo crear el producto");
        return "No se pudo crear el producto"
    }
};

export const getAll = async() =>{
    const productos = await productosModel.find();
    return productos;
}


