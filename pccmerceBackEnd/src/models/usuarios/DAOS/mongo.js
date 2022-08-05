import mongoose from 'mongoose';
import Logger from '../../../services/logger';
import bcrypt from 'bcrypt';
import { ApiError, ErrorStatus } from '../../../services/error';


export default class UsuariosMongoDao {
  _schema = new mongoose.Schema(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      age: { type: Number, required: true },
      celphone: { type: String, required: true },
      admin: { type: Boolean, default: false },
    },
    {
      versionKey: false
    }
    
  );
  _usuarios = mongoose.model('usuarios', this._schema);
  constructor() {
    Logger.info('Inicializamos DAO usuarios mongo');
  }

  async retornaUnUsuario(username){
    const usuario = await this._usuarios.findOne(username)
    return usuario
  } 
  async nuevoUsuario(usuario){
    usuario.password = await bcrypt.hash(usuario.password, 10)
    const newUser = await this._usuarios.create(usuario)
    return newUser
  }

  async retornaUsuarioId(userId){
    const user = await this._usuarios.findById(userId);
    return user
  }

  async existeUsuario(user){
    const usuario = await this._usuarios.findOne({user})
    if(!usuario){
      return false
    }else{
      
      return true
    }
  }
  
  async comparePassword(user){
    const passwordEncriptado = await this._usuarios.findOne({user})
    passwordEncriptado = passwordEncriptado.password
    Logger.info(passwordEncriptado)
    const compare = await bcrypt.compare(user.password, passwordEncriptado)
    return compare
  }

}
