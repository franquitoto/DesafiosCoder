import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://franco99:OrWu5DCtlXaoblJq@cluster0.tvjwd.mongodb.net/eccomerce?retryWrites=true&w=majority'

export const initMongoDB = async () =>{
    try{
        console.log('Conectado a mi DB');
        await mongoose.connect(connectionString);

        console.log("YA ESTOY CONECTADO");
    }catch (error){
        console.log(`ERROR =>${error}`);
        return error;
    }
};
