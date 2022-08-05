import Joi from 'joi';
import { ApiError, ErrorStatus } from '../../services/error';

export default class Productos {
    constructor(titulo, precio, descripcion, imagen){
        this.titulo = titulo;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
    static validar (producto, requerido){
        const schema = Joi.object({
            titulo: requerido? Joi.string().required() : Joi.string(),
            precio: requerido? Joi.number().required() : Joi.string(),
            descripcion: requerido? Joi.string().required() : Joi.string(),
            imagen: requerido? Joi.string().required() : Joi.string(),
        })

        const {error} = schema.validate(producto);

        if(error) throw new ApiError('esquema no valido', ErrorStatus.BadRequest);
    }
}