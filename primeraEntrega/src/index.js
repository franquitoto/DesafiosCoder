const express = require('express');

const mainRouter = require('./routes/index');

//Inicializamos api con express

const app = express();
const puerto = 8080;

// De esta manera levantamos el server normal
const server = app.listen(puerto, () =>{
    console.log('Server up en puerto', puerto);
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter);

app.use((req, res) =>{
    res.status(404).json({
        msj: 'Ruta no encontrada'
    })
})