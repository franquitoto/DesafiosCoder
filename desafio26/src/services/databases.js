import mongoose from 'mongoose';
const connectionString = 

export const initMongoDB = async () =>{
    try{
        console.log("Conectado a mi DB");
        await mongoose.connect(connectionString);
    }catch(error){
        console.log(`error => ${error}`);
        return error;
    }
};
