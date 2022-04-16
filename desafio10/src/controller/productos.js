
let productos = [];



const save = (data) =>{
    const nuevoProducto = {
        id: productos.length,
        titulo: data.titulo,
        precio: data.precio
    };
    productos.push(nuevoProducto);
    
};
const getAll = () =>{
    return productos;
};

module.exports = {
    getAll,
    save,
}
