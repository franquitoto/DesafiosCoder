const fs = require('fs');
const path = './productos.txt'


class Contenedor {

    save = (obj) => {
        try {
                const data = fs.readFileSync(path, 'utf-8')
                const productos = JSON.parse(data)
                const iD = productos.length + 1
                const input = {
                    titulo: obj.titulo,
                    precio: obj.precio,
                    id: iD
                }

                let aux = [
                    ...productos,
                    input,
                ]

                fs.writeFileSync(path, JSON.stringify(aux, null, '\t'))
            }catch (err) {
                console.log("error")
            }
        }
        getById = (id) =>{
            const data = fs.readFileSync(path, 'utf-8');
            const producto = JSON.parse(data)
            console.log(producto[id-1])
            
        }
        deleteById = (id) =>{
            const data = fs.readFileSync(path, 'utf-8');
            const productos = JSON.parse(data)
            const deleteado = productos.filter((e) => e.id != id );
            fs.writeFileSync(path, JSON.stringify(deleteado, null, '\t'))

        }
}

const producto1 = new Contenedor()

// producto1.save({ titulo: 'goma', precio: 70 })
producto1.getById(1)
producto1.deleteById(2)

