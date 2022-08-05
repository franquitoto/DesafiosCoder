import ApiUsuarios from '../apis/usuarios';
import Logger from '../services/logger';

export default class ControladorUsuarios {
  constructor() {
    this.ApiUsuarios = new ApiUsuarios();
  }

  // obtenerUsuarios = async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const productos = await this.ApiProductos.obtenerUsuarios(id);

  //     res.json({
  //       data: productos,
  //     })
  //   } catch (err) {
  //     Logger.error('Error obtener productos');
  //     next(err);
  //   }

  // }
  login = async (req, res, next) => {
    try {
      const user = req.body;
      const username = user.username
      const existeUsuario = await this.ApiUsuarios.existeUsuario(username)
      if (existeUsuario) {
        const compare = await this.ApiUsuarios.comparePassword(user)
        if (compare) {
          res.json({
            msj: `ingresio exitoso, bienvenido ${username}`
          })
        } else {
          res.json({
            msj: "Contraseña incorrecta"
          })
        }
      } else {
        res.json({
          msj: "Usuario incorrecto"
        })
      }
    } catch (err) {
      Logger.error('Error al ingresar');
      next(err)
    }

  }
  guardarUsuario = async (req, res, next) => {
    try {
      const nuevoUsuario = req.body;
      const usuarioGuardado = await this.ApiUsuarios.nuevoUsuario(
        nuevoUsuario
      );
      res.json({
        mgs: 'Usuario guardado',
        data: usuarioGuardado,
      });
    } catch (err) {
      Logger.error('Error al guardar usuario');
      next(err)
    }
  }
}