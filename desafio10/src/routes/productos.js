
const { Router } = require('express');
const express = require('express');
const Productos = require('../controller/productos');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));


router.get('/', (req, res) =>{
    res.render('index');
});

router.post('/guardar', (req, res) =>{

    const body = req.body;
    const nuevoProducto = {
        titulo: body.titulo,
        precio: body.precio
    };
    
    Productos.save(nuevoProducto)
    res.redirect('/')
})

module.exports = router;