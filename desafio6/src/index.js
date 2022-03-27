const fs = require('fs');
const path2 = 'src/productos.txt';


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
                console.log("error", err)
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
producto1.save({titulo: 'Mochila', precio:1000 })


///////////////////////////////////////////////////////////////////////////////

const random = (min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}


const express = require('express');
const path = require('path');

const app = express();

const puerto = 8080;
const server = app.listen(puerto, () =>{
    console.log("servidor Up en puerto", puerto);
});

server.on('error', (err) =>{
    console.log("error en el servidor!! =>", err);
});

app.get('/', (req, res) =>{
    res.json({
        mensaje: "Hola desde la ruta principal"
    });
});

// Envio un HTML basico usando express

app.get('/fyh', (req, res) =>{
    visitas++;
    const fecha = Date();
    res.end(fecha.toString())
})

let visitas = 0
app.get('/visitas', (req, res) =>{
    visitas++;
    const mensaje = `La cantidad de visitas es: ${visitas}`
    res.end(mensaje)
})

app.get('/productos', (req, res) =>{
    visitas++;
    const mensaje = producto1.read()
    res.json(mensaje)
})

app.get('/productoRandom', (req, res) =>{
    visitas++;
    const productos = producto1.read()
    const id = random(1, productos.length) 
    const mensaje = producto1.getById(id)
    res.json(mensaje)
})

///////////////////////////////////////////////////////////////////////

