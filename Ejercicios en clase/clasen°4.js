
const mostrarLetras =  (palabra) => {
    for (let i = 0; i < palabra.length; i++) {
        setTimeout( () => {
            console.log(palabra.slice(i, i+1) , Date)
        }, 2000)
            
    }
}

mostrarLetras('hola');