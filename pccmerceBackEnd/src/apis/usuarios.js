import Logger from '../services/logger';
import Config from '../config';
import UsuariosFactoryDAO from '../models/usuarios/DAOS/factory';
import Joi from 'joi';
import { ApiError, ErrorStatus } from '../services/error';

export default class ApiUsuarios {
  constructor() {
    this.usuariosDAO = UsuariosFactoryDAO.get(Config.PERSISTENCIA);
  }
  
  async retornaUnUsuario(usuario){
    return this.usuariosDAO.retornaUnUsuario(usuario)
  }
  async nuevoUsuario(usuario){
    await ApiUsuarios.validarUsuario(usuario, true)

    return this.usuariosDAO.nuevoUsuario(usuario)
  }
  async retornaUsuarioId(userId){
    return this.usuariosDAO.retornaUsuarioId(userId);
  }
  async existeUsuario(user){
    return this.usuariosDAO.existeUsuario(user);
  }
  async comparePassword(user){
    return this.usuariosDAO.comparePassword(user);
  }
  async 
  async 
  static validarUsuario (usuario, requerido){
    const schema = Joi.object({
        username: requerido? Joi.string().required() : Joi.string(),
        password: requerido? Joi.string().required() : Joi.string(),
        email: requerido? Joi.string().required() : Joi.string(),
        age: requerido? Joi.number().required() : Joi.number(),
        celphone: requerido? Joi.string().required() : Joi.string(),
        admin: requerido? Joi.boolean().required() : Joi.boolean(),
        
    })

    const {error} = schema.validate(usuario);

    if(error) throw new ApiError(`${error}`, ErrorStatus.BadRequest);
  }
}