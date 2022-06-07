import myServer from "./services/server";
import { initMongoDB } from './services/databases';
import { webSocket } from "./services/socket";



const init = async () => {
  await initMongoDB();
  const puerto = 8080

  myServer.listen(puerto, () => console.log(`server up on port ${puerto}`));
}

init();
webSocket()
