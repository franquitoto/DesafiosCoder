import { Router } from "express";
import routerProductos from './productos';


const router = Router();


let usuarios = [
  { user: 'Franco', pass: 'arias' },
  { user: 'Leandro', pass: 'bordon' }
]

router.get('/', (req, res) => {
  if(req.session.nombre){
    const userSesion = req.session.nombre
    res.render('index',{userSesion} );
  }else{
    res.render('login')
  }
  
})
/* --------- index ---------- */
router.get('/index', (req, res) => {
  const indexPath = path.resolve(__dirname, '../../views/index');
  res.render('index');
});
/* --------- login ---------- */
router.get('/login', (req, res) => {
  const loginPath = path.resolve(__dirname, '../../views/login');
  res.render('login');
});

router.post('/login', (req, res) => {
  let { user, pass } = req.body;
  let credencialesOk = usuarios.filter(
    (usuario) => usuario.user == user && usuario.pass == pass
  ).length;
  if (credencialesOk) {
    req.session.nombre = user;
    req.session.contador = 0;
    const userSesion = req.session.nombre
    console.log(userSesion)
    console.log("Ingreso exitoso");
    res.render('index',{userSesion} );
  } else {
    console.log("No estas autorizado");
  }
})

router.get('/logout', (req, res) => {
  
  req.session.destroy((err) => {
    res.redirect('/');
  });
  
});


export default router;