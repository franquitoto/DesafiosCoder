import server from './services/server';
import { initMongoDB } from './services/databases';

const init = async () =>{
  await initMongoDB();
  const puerto = 8080

  server.listen(puerto, () => console.log(`SERVER UP ON PORT ${puerto}`));
}

init();