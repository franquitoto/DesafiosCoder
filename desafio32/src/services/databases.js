import mongoose from 'mongoose';
import Config from './config/index';
import { logger } from './logger';
const connectionString = Config.MONGO_ATLAS_URL

export const initMongoDB = async () =>{
    try{
        logger.info("Conectado a mi DB");
        await mongoose.connect(connectionString);
    }catch(error){
        logger.error(`error => ${error}`);
        return error;
    }
};
