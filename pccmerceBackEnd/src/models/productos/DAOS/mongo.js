import mongoose from 'mongoose';
import Logger from '../../../services/logger';
import { ApiError, ErrorStatus } from '../../../services/error';

export default class ProductosMongoDao {
    _schema = new mongoose.Schema(
        {
            titulo: {type: String, required: true},
            precio: {type: Number, required: true},
            descripcion: {type: String, required: true},
            imagen: {type: String, required: true},
        },
        {
            versionKey: false
        }
    );
    _productos = mongoose.model('productos', this._schema);

    constructor(){
        Logger.info('Inicializamos DAO productos mongo');
    }

    async obtenerProductos(id){
        let output = [];
        if(id){
            const producto = await this._productos.findById(id);
            if(producto) return[producto]
            else throw new ApiError('El producto no existe', ErrorStatus.NotFound);
        }
        output = await this._productos.find()
        return output
    }
    async guardarProducto (data){
        const newProducto = await this._productos.create(data);
        return newProducto;
    }
}