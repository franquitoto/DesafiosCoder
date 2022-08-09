import { Router } from "express";
import UsersRouter from './users';


const router = Router();

router.get('/Hello', (req, res) => { // Enviamos un mensaje simple por una ruta determinada para abalar q el serivod esta arriba
    res.json({
        msg: 'Hola', session: req.session //enviamos un mensaje con la sesion
    });
});

router.use('/users', UsersRouter);

export default router;