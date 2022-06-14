import myServer from "./services/server";
import { initMongoDB } from './services/databases';
import { webSocket } from "./services/socket";
import minimist from 'minimist';
// const optionalArgsObject = {
//   alias: {
//     p: 'puerto'
//   },
//   default: {
//     //Si no nos envian el argumento, se setea por default
//     p: '8080',
//   },
// };
const args = minimist(process.argv);

console.log('TRANSFORMACION ARGV CON MINIMIST')
console.log(args);



const init = async () => {
  await initMongoDB();
  const puerto = 8080

  myServer.listen(puerto, () => console.log(`server up on port ${puerto}`));
}
init();
webSocket()
