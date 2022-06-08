import mongoose from 'mongoose';
import Config from '../config';


export const initDB = () =>{
    return mongoose.connect(Config.MONGO_ATLAS_SRV);
}
