const socket = io.connect();
// **************************** js para ingresar los productos y mostrar la tabla ******************************
// Funcion para completar la tabla

const inner = (id, titulo, precio) =>{
    const tr = document.createElement('tr');
    
    tr.innerHTML=`
    <tr>
        <td>
            ${id}
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            $${precio}
        </td>
</tr> 
    `
    return tr
    
}

const form = document.getElementById('form');
const tabla = document.getElementById('tabla')
const p = document.getElementById('p');

form.addEventListener('submit', (e) =>{
    let input1 = document.getElementById('disabledTextInput');
    let input2 = document.getElementById('precio')
    e.preventDefault();
    let data = {
        titulo: input1.value,
        precio: input2.value
    }
    input1.value = '';
    input2.value= '';
    socket.emit('message', data);
    

})
socket.on('response', (data) =>{
    tabla.classList.remove('tablaNone');
    tabla.classList.add('tablaBlock');
    p.classList.remove('tablaBlock');
    p.classList.add('tablaNone');
    const tbody = document.getElementById('tbody')
    let index = data.length-1;
    tbody.appendChild(inner(data[index]._id, data[index].titulo, data[index].precio))
})
// **************************** js para el chat ******************************
const welcomeUser = (user, mensaje,index) =>{
    const colors = ['primary','secondary','success','danger','warning','info','light','dark']
    const div = document.createElement('div');
    div.innerHTML=`
    <div class="alert alert-${colors[index]} mt-2 mb-2" role="alert">
        ${user}: ${mensaje}  
    </div>
    `
    return div;
}
const bodyMensajes = document.getElementById('bodyMensajes')
socket.on('newUser', (usuario) =>{
    bodyMensajes.appendChild(welcomeUser(usuario, 'Bienvenido',2))
})
const chat = document.getElementById('form1');
chat.addEventListener('submit', (e) =>{
    e.preventDefault();
    let mensaje = document.getElementById('mensaje')
    socket.emit('chat', mensaje.value);
    mensaje.value = ''
})
socket.on('mensaje+usuario', (data) =>{
    const usuario = data.usuario;
    const msj = data.mensaje;
    const index = data.index
    bodyMensajes.appendChild(welcomeUser(usuario, msj, index))
})


