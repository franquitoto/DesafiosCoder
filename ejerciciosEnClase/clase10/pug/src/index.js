const express = require('express');
const path = require('path');

//Inicializamos api con express

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>{
    console.log('Server up en puerto', puerto);
});

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

app.get('/hello', (req , res) =>{
    res.render('hello', {mensaje: 'HOLA MUNDO'});
});

app.get('/eje2', (req, res) =>{
    const datos = {
        titulo: 'Ejemplo numero 2'
    };
    res.render('ejemplo2', datos);
})

app.get('/datos', (req, res) =>{
   console.log(req.query)
   res.render('datos', req.query)
});
