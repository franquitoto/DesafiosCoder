import mongoose from 'mongoose';
import Config from './config/index';
const connectionString = Config.MONGO_ATLAS_URL

export const initMongoDB = async () =>{
    try{
        console.log("Conectado a mi DB");
        await mongoose.connect(connectionString);
    }catch(error){
        console.log(`error => ${error}`);
        return error;
    }
};
