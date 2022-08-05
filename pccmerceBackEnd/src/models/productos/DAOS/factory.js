import Logger from '../../../services/logger'
import ProductosMongoDAO from './mongo.js';

export default class ProductosFactoryDAO {
  static get(tipo) {
    switch (tipo) {
      case 'MONGO':
        Logger.info('Retornando instancia Mongo de Noticias');
        return new ProductosMongoDAO();
      default:
        Logger.info('Retornando instancia Por defecto (Mongo) de Noticias');
        return new ProductosMongoDAO();
    }
  }
}