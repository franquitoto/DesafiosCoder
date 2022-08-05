import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import { ApiError, ErrorStatus } from '../../services/error';

export default class Usuarios {
    constructor(username, password, email, age, celphone, admin){
        this.username = username;
        this.password = password;
        this.email = email;
        this.age = age;
        this.celphone = celphone;
        this.admin = admin;
        
    }
    static validar (usuario, requerido){
        const schema = Joi.object({
            username: requerido? Joi.string().required() : Joi.string(),
            password: requerido? Joi.string().required() : Joi.string(),
            email: requerido? Joi.string().required() : Joi.string(),
            age: requerido? Joi.number().required() : Joi.number(),
            celphone: requerido? Joi.string().required() : Joi.string(),
            admin: requerido? Joi.bolean().required() : Joi.bolean(),
            
        })

        const {error} = schema.validate(producto);

        if(error) throw new ApiError('esquema no valido', ErrorStatus.BadRequest);
    }
}