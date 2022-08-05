import Logger from '../../../services/logger'
import UsuariosMongoDAO from './mongo.js';

export default class UsuariosFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case 'MONGO':
        Logger.info('Retornando instancia Mongo de Usuarios');
        return new UsuariosMongoDAO();
      default:
        Logger.info('Retornando instancia Por defecto (Mongo) de Usuarios');
        return new UsuariosMongoDAO();
    }
  }
}