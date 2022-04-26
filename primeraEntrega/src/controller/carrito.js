const  { uuid }  =  require('uuidv4') ;
const productos = require('./productos');
const express = require('express');
const fs = require('fs');
const path2 = 'src/carrito.txt';
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));

let carrito = []

const save = () =>{
    const nuevoCarrito = {
        id: uuid(),
        timestamp: new Date(),
        productos: []
    }
    carrito.push(nuevoCarrito)
    fs.writeFileSync(path2, JSON.stringify(carrito, null, '\t'))
    console.log(carrito)
    return nuevoCarrito.id
}
const addProductos = (id, data) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    carrito = JSON.parse(dataBase)
    const newProductAdd = productos.getId(data)
    const index = carrito.findIndex(e =>{
        return e.id === id
    })
    carrito[index].productos.push(newProductAdd)
    fs.writeFileSync(path2, JSON.stringify(carrito, null, '\t'))
    console.log(carrito);
}
const deleteId = (id) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    carrito = JSON.parse(dataBase)
    carrito = carrito.filter((e) => e.id != id );
    fs.writeFileSync(path2, JSON.stringify(carrito, null, '\t'))
    console.log(productos)
}
const controlId = (data) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    carrito = JSON.parse(dataBase)
    let res = carrito.find(e => e.id === data)
    if(res != undefined){
        return true
    }else{
        return false
    }
} 
const getCarritoId = (data) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    carrito = JSON.parse(dataBase)
    const index = carrito.findIndex(e =>{
        return e.id === data
    })
    console.log(carrito[index].productos)
    return carrito[index].productos
}
const deleteProducId = (idCarrito, idProducto) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    carrito = JSON.parse(dataBase)
    const index = carrito.findIndex(e =>{
        return e.id === idCarrito
    });
    carrito[index].productos = carrito[index].productos.filter((e) => e.id != idProducto) 
    fs.writeFileSync(path2, JSON.stringify(carrito, null, '\t'))
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