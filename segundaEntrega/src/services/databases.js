const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://franco99:OrWu5DCtlXaoblJq@cluster0.tvjwd.mongodb.net/ffarias?retryWrites=true&w=majority'

const initMongoDB = async () =>{
    try{
        console.log("conectado a mi db");
        await mongoose.connect(connectionString);

        console.log("ya estoy conectado");
    }catch(error){
        console.log('error', error)
        return error;
    }
};
const disconnectMongo = async() => {
	try {
    console.log('DESCONECTANDO DE MI DB');
    await mongoose.disconnect()

    console.log('DESCONEXION OK');
  } catch (error) {
    console.log(`ERROR => ${error}`);
    return error;
  }
}

module.exports = {
    initMongoDB,
    disconnectMongo
}