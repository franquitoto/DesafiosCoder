const express = require('express');
const path = require('path');

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(puerto, () => {
    console.log("Servidor Up en puerto", puerto);
});

server.on('error', (err) => {
    console.log("error en el servidor!! =>", err);
});

let frase = 'Hola mundo como esta?';
app.get('/', (req, res) => {
    res.end('Desafio en clase, clase 7');
})

app.get('/api/frase', (req, res) => {
    res.end(frase);
})

app.get('/api/letras/:num', (req, res) => {
    const n = parseInt(req.params.num)
    if (isNaN(n)) {
        return res.status(400).json({
            error: 'El parametro debe ser numerico'
        })
    }
    if (n >= 0 && n <= frase.length) {
        return res.end(frase[n])
    } else {
        return res.status(400).json({
            error: 'El numero es demasiado grande'
        })
    }
})
app.get('/api/palabras/:num', (req, res) => {
    const letras = frase.split(' ');
    const n = parseInt(req.params.num)
    if (isNaN(n)) {
        return res.status(400).json({
            error: 'El parametro debe ser numerico'
        })
    }
    if (n >= 0 && n <= letras.length) {
        return res.end(letras[n])
    } else {
        return res.status(400).json({
            error: 'El numero es demasiado grande'
        })
    }
})
app.post('/api/palabras', (req, res) => {
    const { nuevaPalabra } = req.body;

    if (!nuevaPalabra) {
        return res.status(400).json({
            msj: 'mandame una palabra'
        })
    } else {

        console.log(nuevaPalabra)
        frase = frase + ' ' + nuevaPalabra;
        res.json({
            agregada: nuevaPalabra,
            pos: frase.split(' ').length,
            frase,
        })
    }
})
app.post('/api/palabras/:pos', (req, res) => {
    let letras = frase.split(' ');
    const { palabra } = req.body;
    const n = parseInt(req.params.pos)
    if (isNaN(n)) {
        return res.status(400).json({
            error: 'El parametro debe ser numerico'
        })
    }
    if (n >= 0 && n <= letras.length) {
        const palabraReemplazada = letras[n-1]
        letras[n-1] = palabra;
        frase = letras.join(' ');
        return res.json({
            actualizada: palabra,
            anterior: palabraReemplazada,
            frase,
        })
    } else {
        return res.status(400).json({
            error: 'El parametro esta fuera de rango'
        })
    }
})
app.delete('/api/palabras/:pos', (req, res) => {
    let letras = frase.split(' ');
    const n = parseInt(req.params.pos)
    if (isNaN(n)) {
        return res.status(400).json({
            error: 'El parametro debe ser numerico'
        })
    }
    if (n >= 0 && n <= letras.length) {
        letras.splice(n-1, 1)
        frase = letras.join(' ');
        return res.json({
            
            frase,
        })
    } else {
        return res.status(400).json({
            error: 'El parametro esta fuera de rango'
        })
    }
})
console.log("prueba")

