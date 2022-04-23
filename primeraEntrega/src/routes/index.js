const express = require('express');
const productosRouter = require('./productos');


const router = express.Router();

router.get('/', (req, res) =>{
    res.json({
        msg: 'saludos desde el router principal'
    });
});


router.use('/productos', productosRouter);
module.exports = router;