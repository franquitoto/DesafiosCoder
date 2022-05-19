const express = require('express');
const productosRouter = require('./productos');
const carritoRouter = require('./carrito');


const router = express.Router();

router.get('/', (req, res) =>{
    res.json({
        msg: 'saludos desde el router principal'
    });
});


router.use('/productos', productosRouter);
router.use('/carrito', carritoRouter);
module.exports = router;