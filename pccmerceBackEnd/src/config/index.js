import minimist from "minimist";
import dotenv from 'dotenv';

dotenv.config();

const optionalArgsObjet = {
    default: {
        persistencia: "MONGO",
    },
};

const args = minimist(process.argv, optionalArgsObjet);

export default {
    NODE_ENV : process.env.NODE_ENV || 'development',
    PORT: 8080,
    MONGO_ATLAS_SRV: process.env.MONGO_ATLAS_SRV || 'mongosrv',
    PERSISTENCIA: args.persistencia
}