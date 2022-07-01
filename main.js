//Requerimos mongoose ( Nuestro puente entre express y mongodb )
const mongoose = require("mongoose")
//Base de datos --> mascotas
mongoose.connect("mongodb://localhost:27017/mascotas")
    .then(resultado => {
        console.log("Conexion completada")
    })
    .catch(error => {
        console.log(error)
    })

//Modelo de datos -> Es la estructura o la informacion que vamos a guardar
//Schema es la implementacion de los datos String, Number, Boolean, Date
//Las colecciones son los modelos
const gatoModelo = mongoose.model("Gato", {
    name: String,
    edad: Number,
    color: String,
    ojos: String
})

const perroModelo = mongoose.model("Perro", {
    name: String,
    edad: Number,
})

//Para que no se repita cada vez que iniciemos el programa (node main.js) :)
function crearMascotas() {
    //Creamos un nuevo gatito con promesas then/catch
    const gatito = new gatoModelo({ name: "Atun", edad: 5, color: "Gris", ojos: "Azul" })
    gatito
        .save()
        .then((elGatoNuevo) => {
            console.log(elGatoNuevo)
            console.log("Se creo un nuevo gatito")
        }).catch(error => {
            console.log(error)
        })

    //Creamos un nuevo perrito con async y await
    const perrito = new perroModelo({ name: "Puppy", edad: 1 })
    async function crearPerrito() {
        try {
            const elNuevoPerrito = await perrito.save()
            console.log(elNuevoPerrito)
        } catch (error) {
            console.log("error perrito", error)
        }
    }

    crearPerrito()
}

//Obtener gatos - Filtro/filter utilizando then y catch
gatoModelo.find({ name: "Vainilla", edad: 5 }, { name: 1, _id: 0 })
    .then((losGatosEncontrados) => {
        console.log(losGatosEncontrados)
    })
    .catch(err => {
        console.log(err)
    })
//Obtener los perritos usando async await
async function obtenerPerritos() {
    try {
        const losPerrosEncontrados = await perroModelo.find({ name: "Puppy", edad: 12 })
        console.log("perritos", losPerrosEncontrados)
    } catch (error) {
        console.log("error perrito", error)
    }
}

obtenerPerritos()