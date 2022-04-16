const express = require('express');
const {engine} = require('express-handlebars');
const path = require('path');


const app = express();

app.listen(8080, () =>{
    console.log("read");
});

const layoutsFolderPath = path.resolve(__dirname, './../views/layouts');
const defaultLayoutPath = path.resolve(__dirname, './../views/layouts/index.hbs')

console.log(layoutsFolderPath)

app.set('view engine', 'hbs');
app.use(express.static('public'))
app.engine('hbs', engine({
    layoutsDir: layoutsFolderPath,
    extname: 'hbs',
    defaultLayout: defaultLayoutPath
}))

app.use(express.static('public'))
app.get('/', (req, res) =>{
    res.render('main');
});
app.get('/productos', (req, res) =>{
    const dinamicData = {
        nombre: 'Franco',
        apellido: 'arias',
        listaSuper: ['Mate', 'Cafe', 'Harina', 'palmitos'],
        listaParaHacer: [
            {
                tarea: 'Hacer cafe',
                style: 'topLaner'
            },
            {
                tarea: 'Hacer la comida',
                style: 'midLaner'
            },{
                tarea: 'Hacer cafe',
                style: 'topLaner'
            },
        ]
    }
    res.render('productos', dinamicData);
});
