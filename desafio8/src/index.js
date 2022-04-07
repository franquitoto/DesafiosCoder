const express = require('express');
const mainRouter = require('./routes/index');
const path = require('path');



const app = express();
const puerto = 8080;
const server = app.listen(puerto, () => {
    console.log('server up en puerto', puerto);
});

server.on('eror', (err) =>{
    console.log('error atajado', err);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter);

const publicFolderPath = path.resolve(__dirname, '../public');

app.use(express.static(publicFolderPath))
