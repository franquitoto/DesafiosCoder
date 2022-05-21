const { productosModel } = require('../models/productos');
const { initMongoDB, disconnectMongo } = require('../services/databases');

const crearVariosProductos = async (productos) => {
    const creaciones = productos.map(a => crearProducto(a))
    await Promise.all(creaciones);
}
const getAll = async (id) => {
    await initMongoDB()
    const productos = await productosModel.find()

    disconnectMongo()
    return productos

}
const getById = async (id) => {
    try {
        await initMongoDB()
        const productId = await productosModel.findById(id)
        if(!productId){
            disconnectMongo()
            return "El producto no existe"
        }
        disconnectMongo()
        return productId
    } catch (erro) {
        disconnectMongo()
        let msj = "el producto no existe"
        return msj
    }    
}

const save = async (body) => {
    try {
        await initMongoDB()
        const newProduct = await productosModel.create({
            titulo: body.titulo,
            precio: body.precio
        });
        console.log(newProduct)
        disconnectMongo()
        return newProduct
    } catch (error) {
        console.log("no se pudo crear el producto");
        return "No se pudo crear el producto"
    }

};

const changeId = async (id, body) => {
    let titulo = body.titulo;
    let precio = body.precio;
    try {
        await initMongoDB()
        const productoActualizado = await productosModel.findByIdAndUpdate(
            id,
            { titulo: titulo, precio: precio },
            { new: true }
        );
        console.log(productoActualizado)
        disconnectMongo()
        return productoActualizado
    } catch (erro) {
        disconnectMongo()
        return "Error al actualizar producto"
    }

}
const deleteId = async (id) =>{
    try{
        await initMongoDB()
        await productosModel.findByIdAndDelete(id);
        disconnectMongo()
    }catch(err){
        disconnectMongo()
        console.log(err)
        return "Ocurrio un error al eliminar el producto, verifique que el ID sea correcto"
    }
}

const controlId = async (id) =>{
    try {
        await initMongoDB()
        const productId = await productosModel.findById(id)
        if(!productId){
            disconnectMongo()
            return false
        }
        disconnectMongo()
        return true
    } catch (erro) {
        disconnectMongo()
        let msj = "el producto no existe"
        return false
    }
}
module.exports = {
    save,
    crearVariosProductos,
    getAll,
    getById,
    changeId,
    deleteId
    
}