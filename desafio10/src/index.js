const express = require('express');
const path = require('path');
const mainRouter = require('./routes/index');
const Productos = require('./controller/productos');
const io = require('socket.io');
const http = require('http');

//Inicializamos api con express

const app = express();
const puerto = 8080;

// De esta manera levantamos el server normal
// const server = app.listen(puerto, () =>{
//     console.log('Server up en puerto', puerto);
// });

// De esta manera levantamos el server con socket
const myServer = http.Server(app);
myServer.listen(puerto, () =>console.log('server up en puerto', puerto))

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);


app.get('/', (req, res) =>{
    const productos = Productos.getAll();
    console.log(productos)
    res.render('index', {productos})
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter);

const myWSServer = io(myServer)

myWSServer.on('connection', (socket ) =>{
    console.log('un cliente se a conectado');
    console.log('socket del server', socket.id);
    console.log('socket del cliente', socket.client.id);

    socket.on('message', (data) =>{
        Productos.save(data)
        myWSServer.emit('response', Productos.getAll())
    })

    
    
});