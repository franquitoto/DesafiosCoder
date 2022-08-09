// Imnportamos doten para obtener las variables de entorno previamente seteadas en dotenv
import dotenv from 'dotenv';

// habilitamos la funcion config de dotenv
dotenv.config();
// exportamos las variables de entorno a la aplicacion
export default{
    MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongoSRV',
    PORT: process.env.PORT || 8080,
}