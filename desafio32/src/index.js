import myServer from "./services/server";
import { initMongoDB } from './services/databases';
import { webSocket } from "./services/socket";
import minimist from 'minimist';
import cluster from "cluster";
import os from 'os';
import { logger } from "./services/logger";

// const optionalArgsObject = {
//   alias: {
//     p: 'puerto'
//   },
//   default: {
//     //Si no nos envian el argumento, se setea por default
//     p: '8080',
//   },
// };
//

const numCPUs = os.cpus().length
const args = minimist(process.argv);
const puerto = args.port || 8080;

const init = async (n) => {
  
  await initMongoDB();
  myServer.listen(puerto, () => logger.info(`server up on port ${puerto} PID WORKER ${n}`));
}
const modoCluster = args.modo




logger.info(args);
if(modoCluster === "cluster"){
  console.log("modo cluster")
  if (cluster.isPrimary) {
    console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);
  
    for (let i = 0; i <= numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker, code) => {
      logger.warn(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
      cluster.fork();
    });
  } else {
    /* --------------------------------------------------------------------------- */
    /* WORKERS */
    init(process.pid);
    webSocket()
  }
}else{
    init(process.pid);
    webSocket()
    logger.info("modo fork")
}
 
