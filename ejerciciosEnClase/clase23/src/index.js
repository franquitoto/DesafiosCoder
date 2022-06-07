import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const mySecret = 'mySecret';
app.use(cookieParser(mySecret));
app.use(express.json());


app.post('/crear', (req, res) => {
    const body = req.body;
    console.log(body);
    const nombre = body.nombre;
    const valor = body.valor;
    try {
        if (body.tiempo) {
            const tiempo = body.tiempo;
            res.cookie(nombre, valor, { maxAge: tiempo }).send({ msg: 'OK con time' });
        } else {
            res.cookie(nombre, valor).send({ msg: 'OK' });
        }

    } catch (err) {
        res.json({
            err: err.message
        })
    }

});
app.get('/get-cookies', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send({
        cookies: req.cookies,
    });
});
app.delete('/:nombre', (req, res) =>{
    
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});