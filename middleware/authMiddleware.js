import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;
    
    // Verificamos que el token sea igual y si es asi guardamos el token y 
    // lo verificamos con jwt y obtenemos el id del usuario y lo buscamos en 
    // base de datos y guardamos los datos para mostrar en la pag. de perfil
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // almacenamos los datos del usuario
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado -__v");
            return next();
        } catch (error) {
            const e = new Error("Token no válido")
            res.status(403).json({ msg: e.message })
        }
    }

    if(!token){
        const error = new Error("Token no válido o inexistente")
        res.status(403).json({ msg: error.message });
    }  
    next();
}

export default checkAuth;