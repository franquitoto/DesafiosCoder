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
        return this.libros
    }
}

const person1 = new Personas('Franco','Arias',['1984,', 'el principito'],'luchi');

person1.addMascosta('kaian')
console.log(person1.getFullName());
console.log(person1.counMascotas());
console.log(person1.getBookNames());

