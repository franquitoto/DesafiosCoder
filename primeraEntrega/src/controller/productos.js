let productos = [
    {
        id: 1,
        titulo: 'lapiz',
        precio: 250
    },
    {
        id: 2,
        titulo: 'regla',
        precio: 300
    },
    {
        id: 3,
        titulo: 'cartuchera',
        precio: 500
    },


];
const save = (data) =>{
    const nuevoProducto = {
        id: productos.length+1,
        titulo: data.titulo,
        precio: data.precio
    };
    productos.push(nuevoProducto);
    
};
const getAll = () =>{
    return productos;
};
const getId = (data) =>{
    return productos[data-1]
}
const changeId = (id, data) =>{
    const index = productos.findIndex(e =>{
        return e.id === id
    })
    productos[index].titulo = data.titulo
    productos[index].precio = data.precio    
}
const deleteId = (id) =>{
    productos = productos.filter((e) => e.id != id );
    console.log(productos)
}
const controlId = (id) =>{
    if(isNaN(id)){
        return false
    }
    if(id >= 0 && id <= productos.length){
        return true
    }else{
        return false
    }
}

module.exports = {
    getAll,
    save,
    getId,
    changeId,
    deleteId,
    controlId,
}