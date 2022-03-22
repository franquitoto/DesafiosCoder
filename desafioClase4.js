const fs = require('fs');
const path = './productos.txt'


class Contenedor {

    save = (obj) => {
        const misProductos = fs.readFileSync(path, 'utf-8')
        if (misProductos.length === 0) {
            const iD = misProductos.length + 1
            const input = {
                titulo: obj.titulo,
                precio: obj.precio,
                id: iD
            }
            misProductos.push(input)
            fs.writeFileSync(path,JSON.stringify(misProductos, null, '\t'))
        }else{
            const data = fs.readFileSync(path, 'utf-8')
            misProductos = JSON.parse(data)
            console.log(misProductos)
            const iD = misProductos.length + 1
            const input = {
                titulo: obj.titulo,
                precio: obj.precio,
                id: iD
            }
            misProductos.push(input)
            fs.writeFileSync(path,JSON.stringify(misProductos, null, '\t'))
        }



    }
}

const producto1 = new Contenedor()

producto1.save({titulo: 'porfaaa', precio: 15})

