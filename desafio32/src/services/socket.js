import myServer from './server';
import io from 'socket.io';
import { save, getAll } from '../controllers/productos';
import { logger } from './logger';

export const webSocket = () => {
    const usuarios = []
    const myWSServer = io(myServer);
    myWSServer.on('connection', (socket) => {
        logger.info('un cliente se a conectado');
        logger.info('socket del server', socket.id);
        logger.info('socket del cliente', socket.client.id);
        let usuario = socket.client.id;
        usuarios.push(usuario)
        socket.emit('newYser', usuario);
        socket.on('message', (data) =>{
            save(data) 
            let productos;
            (
                async () =>{
                    productos = await getAll();
                    myWSServer.emit('response', productos);
                }
            )()
            
        })
        socket.on('chat', (data) =>{
            let index = usuarios.indexOf(usuario);
            logger.info(data)
            const mensaje = {
                usuario: usuario,
                mensaje: data,
                index: index
            }
            myWSServer.emit('mensaje+usuario', mensaje);
        })
    })
} 