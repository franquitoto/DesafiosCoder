class Personas {
    constructor(nombre, apellido, libros, mascota){
        this.nombre = nombre,
        this.apellido = apellido,
        this.libros = libros,
        this.mascota = [mascota]
    }
    getFullName = () =>{
        let fullName = this.nombre + ' '+ this.apellido
        return fullName
    }
    addMascosta = (newMascota) =>{
        let newArray = this.mascota
        newArray.push(newMascota)
        this.mascota = newArray
    }
    counMascotas = () =>{
        return this.mascota.length
    }
    getBookNames = () =>{
        let libros1 = this.libros
        for (let i = 0; i < libros1.length; i++) {
            console.log(libros1[i].nombre)
        }
    }
}

const person1 = new Personas('Franco','Arias',[{nombre: '1984', autor: 'orwel'}, {nombre: 'Principito', autor: 'Antoine de Saint-Exupéry'}],'luchi');

person1.addMascosta('kaian')
console.log(person1.getFullName());
console.log(person1.counMascotas());
console.log(person1.getBookNames());

