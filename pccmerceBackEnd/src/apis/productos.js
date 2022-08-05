import Logger from '../services/logger';
import Config from '../config';
import ProductosFactoryDAO from '../models/productos/DAOS/factory'
import Joi from 'joi';
import { ApiError, ErrorStatus } from '../services/error';

export default class ApiProductos {
  constructor() {
    this.productosDAO = ProductosFactoryDAO.get(Config.PERSISTENCIA);
  }
  async obtenerProductos(id) {
    return this.productosDAO.obtenerProductos(id);
  }
  async guardarProducto(nuevoProducto){
    await ApiProductos.validarProducto(nuevoProducto, true)

    return this.productosDAO.guardarProducto(nuevoProducto);
  }

  static validarProducto(producto, requerido = true) {
    const schema = Joi.object({
      titulo: requerido ? Joi.string().required() : Joi.string(),
      precio: requerido ? Joi.number().required() : Joi.string(),
      descripcion: requerido ? Joi.string().required() : Joi.string(),
      imagen: requerido ? Joi.string().required() : Joi.string(),
    });

    const { error } = schema.validate(producto);
    if (error) throw new ApiError(`Esquema no valido. ${error}`, ErrorStatus.BadRequest);
  }
}