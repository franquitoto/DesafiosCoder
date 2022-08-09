import mongoose from "mongoose"; // importamos libreria para trabajar con la mongodb;
import Config from "../config"; // Importamos las variables de entorno;
import Logger from "./logger";



// Exportamos la funcion para conectarnos a la DB
export const connectDb = () =>{
    Logger.info('Conectado a mi DB');
    return mongoose.connect(Config.MONGO_ATLAS_URL, {useNewUrlParser: true}); // Retornamo el metodo de mongoose para conectarse a la db
}