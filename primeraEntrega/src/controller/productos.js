const express = require('express');
const fs = require('fs');
const path2 = 'src/productos.txt';
const  { uuid }  =  require('uuidv4') ;
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
const save = (data) =>{
    try{
        const dataBase = fs.readFileSync(path2, 'utf-8');
        const productos = JSON.parse(dataBase)
        const nuevoProducto = {
            id: uuid(),
            timestamp: new Date(),
            titulo: data.titulo,
            precio: data.precio
        };
        productos.push(nuevoProducto)
        fs.writeFileSync(path2, JSON.stringify(productos, null, '\t'))
    }catch(err){
        console.log("error al guardar", err)
    }
};
const getAll = () =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    const productos = JSON.parse(dataBase)
    return productos;
};
const getId = (data) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    const productos = JSON.parse(dataBase)
    const retorno = productos.filter(e => e.id === data)
    return retorno
}
const changeId = (id, data) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    const productos = JSON.parse(dataBase)
    const index = productos.findIndex(e => e.id === id)
    console.log(index)
    console.log(productos[index])
    productos[index].titulo = data.titulo
    productos[index].precio = data.precio
    fs.writeFileSync(path2, JSON.stringify(productos, null, '\t'))
}
const deleteId = (id) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    let productos = JSON.parse(dataBase)
    productos = productos.filter((e) => e.id != id );
    fs.writeFileSync(path2, JSON.stringify(productos, null, '\t'))
}
const controlId = (id) =>{
    const dataBase = fs.readFileSync(path2, 'utf-8');
    const productos = JSON.parse(dataBase)
    const index = productos.findIndex(e => e.id === id)
    console.log(index)
    if(index != -1){
        console.log("existe")
        return true
    }else{
        console.log("No existe")
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