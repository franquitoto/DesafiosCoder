import mongoose from 'mongoose';
const connectionString = 'mongodb+srv://franco99:Coco2022@cluster0.tvjwd.mongodb.net/eccomerce?retryWrites=true&w=majority'

export const initMongoDB = async () =>{
    try{
        console.log("Conectado a mi DB");
        await mongoose.connect(connectionString);
    }catch(error){
        console.log(`error => ${error}`);
        return error;
    }
};
