const { Router } = require('express');
const express = require('express');

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));

const fs = require('fs');
const path2 = 'src/productos.txt';

const random = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}

class Contenedor {

    save = (obj) => {
        try {
                const data = fs.readFileSync(path2, 'utf-8')
                const productos = JSON.parse(data)
                const iD = productos.length + 1
                const input = {
                    titulo: obj.titulo,
                    precio: obj.precio,
                    id: iD
                }

                let aux = [
                    ...productos,
                    input,
                ]

                fs.writeFileSync(path2, JSON.stringify(aux, null, '\t'))
            }catch (err) {
                console.log("error al guardar", err)
            }
        }
        getById = (id) =>{
            const data = fs.readFileSync(path2, 'utf-8');
            const producto = JSON.parse(data)
            console.log(producto[id-1])
            return producto[id-1]
            
        }
        deleteById = (id) =>{
            const data = fs.readFileSync(path2, 'utf-8');
            const productos = JSON.parse(data)
            const deleteado = productos.filter((e) => e.id != id );
            fs.writeFileSync(path2, JSON.stringify(deleteado, null, '\t'))
        }
        read = () =>{
            const data = fs.readFileSync(path2, 'utf-8');
            const productos = JSON.parse(data)
            return productos
        }
}

const producto1 = new Contenedor()


router.get('/', (req, res) =>{
    res.json({
        msj: producto1.read()
    });
});

router.get('/:num', (req, res) => {
    const n = parseInt(req.params.num)
    if (isNaN(n)) {
        return res.status(400).json({
            error: 'El parametro debe ser numerico'
        })
    }
    if (n >= 0 && n <= producto1.read().length) {
        return res.json({
            msj: producto1.getById(n)
        })
    } else {
        return res.status(400).json({
            error: 'El numero es demasiado grande'
        })
    }
})
router.post('/', (req, res) => {
    const body = req.body;
    const nuevoProducto = {
        titulo: body.titulo,
        precio: body.precio
    }
    console.log(nuevoProducto)
    
    if (!nuevoProducto) {
        return res.status(400).json({
            msj: 'mandame un producto'
        })
    } else {

        console.log(nuevoProducto)
        producto1.save(nuevoProducto)
        res.json({
            agregado: nuevoProducto,
            id: producto1.read().length-1,
        })
    }
})
router.delete('/:id', (req, res) => {
    const n = parseInt(req.params.id)
    if (isNaN(n)) {
        return res.status(400).json({
            error: 'El parametro debe ser numerico'
        })
    }
    if (n >= 0 && n <= producto1.read().length) {
        const eliminado = producto1.getById(n)
        producto1.deleteById(n)
        return res.json({
            Eliminado: eliminado,
            productos: producto1.read()
        })
    } else {
        return res.status(400).json({
            error: 'El numero es demasiado grande'
        })
    }
})


module.exports = router;