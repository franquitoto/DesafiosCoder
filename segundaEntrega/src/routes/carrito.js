const { Router, query } = require('express');
const express = require('express');
const productos = require('../controller/productos');

const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/', (req, res) =>{
    res.json({
        msj: 'Hola desde el reuter carrito'
    })
});

router.post('/', (req, res) =>{
    let idCarrito = carrito.save()

    res.status(200).json({
        msj: 'A creado un nuevo carrito',
        id: idCarrito
    })
})

router.post('/:idCarrito/:idProducto', (req, res) =>{
    const idProducto = parseInt(req.params.idProducto);
    const idCarrito = req.params.idCarrito
    if(carrito.controlId(idCarrito) === true){
        if(productos.controlId(idProducto) === true){
            carrito.addProductos(idCarrito, idProducto)
            res.status(500).json({
                mjs: 'Producto agregado correctamente'
            })
        }else{
            return res.status(400).json({
                error: 'El numero es demasiado grande o demasiado chico'
            })
        }
    }else{
        res.status(400).json({
            error: 'El id ingresado es incorrecto'
        })
    }

    
})

router.delete('/:idCarrito', (req, res) =>{
    const idCarrito = req.params.idCarrito;
    if(carrito.controlId(idCarrito) === true){
        carrito.deleteId(idCarrito)
        res.status(500).json({
            msj: 'Eliminado correctamente'
        })
    }else{
        res.status(400).json({
            error: 'El id ingresado es incorrecto'
        })
    }
})

router.get('/:idCarrito', (req, res) =>{
    const idCarrito = req.params.idCarrito;
    if(carrito.controlId(idCarrito) === true){
        let msj = carrito.getCarritoId(idCarrito)
        res.status(500).json({
            msj
        })
    }else{
        res.status(400).json({
            error: 'El id ingresado es incorrecto'
        })
    }
})

router.delete('/:idCarrito/productos/:idProducto', (req, res) =>{
    const idProducto = parseInt(req.params.idProducto);
    const idCarrito = req.params.idCarrito
    if(carrito.controlId(idCarrito) === true){
        if(productos.controlId(idProducto) === true){
            carrito.deleteProducId(idCarrito, idProducto)
            res.status(500).json({
                mjs: 'Producto eliminado correctamente'
            })
        }else{
            return res.status(400).json({
                error: 'El numero es demasiado grande o demasiado chico'
            })
        }
    }else{
        res.status(400).json({
            error: 'El id ingresado es incorrecto'
        })
    }
})




module.exports = router;