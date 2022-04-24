const { json } = require('express');
const  { uuid }  =  require('uuidv4') ;
const productos = require('./productos');

let carrito = []

const save = () =>{
    const nuevoCarrito = {
        id: uuid(),
        timestamp: new Date(),
        productos: []
    }
    carrito.push(nuevoCarrito)
    console.log(carrito)
    return nuevoCarrito.id
}
const addProductos = (id, data) =>{
    const newProductAdd = productos.getId(data)
    const index = carrito.findIndex(e =>{
        return e.id === id
    })
    carrito[index].productos.push(newProductAdd)
    console.log(carrito);
}
const deleteId = (id) =>{
   carrito = carrito.filter((e) => e.id != id );
    console.log(productos)
}
const controlId = (data) =>{
    let res = carrito.find(e => e.id === data)
    if(res != undefined){
        return true
    }else{
        return false
    }
} 
const getCarritoId = (data) =>{
    const index = carrito.findIndex(e =>{
        return e.id === data
    })
    console.log(carrito[index].productos)
    return carrito[index].productos
}
const deleteProducId = (idCarrito, idProducto) =>{
    const index = carrito.findIndex(e =>{
        return e.id === idCarrito
    })
    const indexProduct = carrito[index].productos.findIndex(e =>{
        return e.id === idProducto
    })
    carrito[index].productos = carrito[index].productos.filter((e) => e.id != idProducto) 
    console.log(carrito[index].productos)
}

module.exports = {
    save,
    addProductos,
    deleteId,
    controlId,
    getCarritoId,
    deleteProducId,
}