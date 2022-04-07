const express = require('express');
const personasRouter = require('./personas');
const mascotasRouter = require('./mascotas');
const productosRouter = require('./productos');

const router = express.Router();

router.get('/hola', (req, res) =>{
    res.json({
        msg: 'saludos desde el router principal'
    });
});

router.use('/personas', personasRouter);
router.use('/mascotas', mascotasRouter);
router.use('/productos', productosRouter);

module.exports = router;