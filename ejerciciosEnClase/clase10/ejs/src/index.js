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

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

app.get('/', (req, res) =>{
    res.render('hola')
})

app.get('/ejemplo2', (req, res) =>{
    const datos = {
        titulo: 'HOLA MUNDO',
        mensaje: 'cele te amo'
    }
    res.render('ejemplo2', datos)
})