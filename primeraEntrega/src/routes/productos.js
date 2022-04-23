const { Router, query } = require('express');
const express = require('express');

const router = express.Router();

const Productos = require('../controller/productos');
router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) =>{
    let productos = Productos.getAll()
    res.json({
        productos
    });
});

router.get('/:id', (req, res) =>{
    
    const id = parseInt(req.params.id)
    if(Productos.controlId(id) === true){
        return res.json({
            msj: Productos.getId(id)
        })
    }else{
        return res.status(400).json({
            error: 'El numero es demasiado grande o demasiado chico'
        })
    }
});
router.post('/',(req, res) =>{
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    const body = req.body;
    if(typeof titulo != "string"){
        return res.status(400).json({
            error: "El titulo debe ser un string"
        })
        
    }
    if(typeof precio != "number"){
        return res.status(400).json({
            error: "El precio debe ser numerico"
        })
    }
    else{
        Productos.save(body)
        console.log(Productos.getAll())
        res.status(500).json({
            msj: "Informacion enviada correctamente"
        })
    }
    
})
router.put('/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const body = req.body;
    const titulo = req.body.titulo;
    const precio = req.body.precio;
    if(Productos.controlId === true){
        if(typeof titulo != "string"){
            return res.status(400).json({
                error: "El titulo debe ser un string"
            })
            
        }
        if(typeof precio != "number"){
            return res.status(400).json({
                error: "El precio debe ser numerico"
            })
        }
        else{
            Productos.changeId(id, body)
            res.status(500).json({
                msj: "Informacion enviada correctamente"
            })
        }
    }else{
        return res.status(400).json({
            error: 'El numero es demasiado grande o demasiado chico'
        })
    }
    
})
router.delete('/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    if(Productos.controlId(id) === true){
        Productos.deleteId(id)
        res.status(500).json({
            mjs: 'Producto eliminado correctamente'
        })
    }else{
        return res.status(400).json({
            error: 'El numero es demasiado grande o demasiado chico'
        })
    }
    
})


module.exports = router;