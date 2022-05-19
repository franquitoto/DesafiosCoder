const {productosModel} = require('../models/productos');
const {initMongoDB, disconnectMongo} = require('../services/databases');

const save = async (newProduct) =>{
    console.log(`Vamos a crear a ${newProduct.titulo}`)
	await productosModel.create(newProduct)
	console.log("DONE\n\n");
}
const crearVariosProductos = async (productos) =>{
    const creaciones = productos.map(a => crearProducto(a))
    await Promise.all(creaciones);
}
const getAll = async (req, res) =>{
    await initMongoDB()
    const productos = await productosModel.find()
    disconnectMongo()
    return productos
    
}



module.exports = {
    save,
    crearVariosProductos,
    getAll
}