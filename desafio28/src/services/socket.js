import myServer from './server';
import io from 'socket.io';
import { save, getAll } from '../controllers/productos';

export const webSocket = () => {
    const usuarios = []
    const myWSServer = io(myServer);
    myWSServer.on('connection', (socket) => {
        console.log('un cliente se a conectado');
        console.log('socket del server', socket.id);
        console.log('socket del cliente', socket.client.id);
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
            console.log(data)
            const mensaje = {
                usuario: usuario,
                mensaje: data,
                index: index
            }
            myWSServer.emit('mensaje+usuario', mensaje);
        })
    })
} 