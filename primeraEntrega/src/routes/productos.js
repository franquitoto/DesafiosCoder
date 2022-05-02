const { Router, query } = require('express');
const express = require('express');

const router = express.Router();

const Productos = require('../controller/productos');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const userAdmin = true

router.get('/', (req, res) => {
    let productos = Productos.getAll()
    res.json({
        productos
    });
});

router.get('/:id', (req, res) => {

    const id = req.params.id
    if (Productos.controlId(id) === true) {
        return res.json({
            msj: Productos.getId(id)
        })
    } else {
        return res.status(400).json({
            error: 'El producto no existe'
        })
    }
});
router.post('/', (req, res) => {
    if (userAdmin) {
        const titulo = req.body.titulo;
        const precio = req.body.precio;
        const body = req.body;
        if (typeof titulo != "string") {
            return res.status(400).json({
                error: "El titulo debe ser un string"
            })

        }
        if (typeof precio != "number") {
            return res.status(400).json({
                error: "El precio debe ser numerico"
            })
        }
        else {
            Productos.save(body)
            console.log(Productos.getAll())
            res.status(200).json({
                msj: "Informacion enviada correctamente"
            })
        }
    } else {
        res.status(500).json({
            error: "Opcion solo valida para administradores"
        })
    }


})
router.put('/:id', (req, res) => {
    if (userAdmin) {
        const id = req.params.id;
        const body = req.body;
        const titulo = req.body.titulo;
        const precio = req.body.precio;
        if (Productos.controlId(id) === true) {
            if (typeof titulo != "string") {
                return res.status(400).json({
                    error: "El titulo debe ser un string"
                })

            }
            if (typeof precio != "number") {
                return res.status(400).json({
                    error: "El precio debe ser numerico"
                })
            }
            else {
                Productos.changeId(id, body)
                res.status(200).json({
                    msj: "Informacion enviada correctamente"
                })
            }
        } else {
            return res.status(400).json({
                error: 'El numero es demasiado grande o demasiado chico'
            })
        }
    } else {
        res.status(500).json({
            error: "Opcion solo valida para administradores"
        })
    }


})
router.delete('/:id', (req, res) => {
    if (userAdmin) {
        const id = req.params.id;
        if (Productos.controlId(id) === true) {
            Productos.deleteId(id)
            res.status(200).json({
                mjs: 'Producto eliminado correctamente'
            })
        } else {
            return res.status(400).json({
                error: 'El numero es demasiado grande o demasiado chico'
            })
        }
    } else {
        res.status(500).json({
            error: "Opcion solo valida para administradores"
        })
    }


})


module.exports = router;