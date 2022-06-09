import productosModel from '../models/productos';

export const save = async (data) => {
    try {
        
        const newProduct = await productosModel.create({
            titulo: data.titulo,
            precio: data.precio
        });
        return newProduct
    } catch (error) {
        console.log("no se pudo crear el producto");
        return "No se pudo crear el producto"
    }
};

export const getAll = async() =>{
    const productos = await productosModel.find();
    return productos;
}

