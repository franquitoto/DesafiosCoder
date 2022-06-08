import Config from './config/index';
import { initDB } from './services/db';
import Server from './services/server'

const init = async () =>{
  await initDB();
  console.log("conectado a mi DB");
  Server.listen(Config.PORT, () =>{
    console.log("Escuchando en el puerto ", Config.PORT);
  })
};

init();