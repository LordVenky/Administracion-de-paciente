import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import generarId from "../helpers/generarId.js";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false 
    }
});

// vamos al modelo de la DB y config para ocultar la contraseña
veterinarioSchema.pre('save', async function(next){
    // Si la password ya esta hashada no lo va a hashear y se activa 
    // next() que lo hace es saltar la linea de codigo y se ejecute
    if(!this.isModified('password')) {
        next();
    }

    // Config. como se hashea la passowrd
    const salt = await bcrypt.genSalt(10);
    // Indicamos el objeto y la password para hashearla.
    this.password = await bcrypt.hash(this.password, salt)
})

// Creamos la function "comprobarPassword" y lo que hace es comprar la password
// que le pasamos desde req.body de "/login" y la evalaluamnos si son iguales.
veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Veterinario = mongoose.model("Veterinario", veterinarioSchema);
export default Veterinario;