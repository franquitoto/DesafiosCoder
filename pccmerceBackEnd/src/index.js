import Config from './config'; // Importamos config para obtener la URL para entrar a la mongodb;
import {connectDb} from './services/db'; // Importamos la funcion para conectarnos a la base de datos;
import Server from './services/server'; // Impotamos la funcion para inicializar el servidor con express;
import Logger from './services/logger';

const {PORT} = Config;

const init = async () =>{
    await connectDb();
    const server = Server.listen(PORT, () => {
        Logger.info(`Servidor escuchando en el puerto ${PORT}`);
    })
    server.on('error', (error) => Logger.error(`error en el servidor: ${error}`));
};

init();
