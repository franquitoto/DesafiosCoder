const socket = io.connect();
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
            ${precio}
        </td>
</tr> 
    `
    return tr
    
}

const form = document.getElementById('form');

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
    data.forEach(e => {
        inner(e.id, e.titulo, e.precio)
    });
    
})

