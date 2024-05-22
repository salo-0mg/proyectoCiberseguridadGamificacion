import {ROLES} from '../models/Role'
import User from '../models/User'

export const checkRolesExists = (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({message: `El rol ${req.body.roles[i]} no exsite`})
            }
        }
    }
    next();
}

export const checkDuplicateEmail= async (req, res, next) => {
    const email = await User.findOne({email: req.body.email })

    if(email) return res.status(400).json({message: "Ese email ya está registrado"})

    next()
}

export const checkPassword= (req, res, next) => {
    const password = req.body.password
    if (password.length < 8 || !/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
        return res.status(400).json({message: "La contraseña debe tener al menos 8 caracteres, un número y una letra mayúscula"})
    };

    next()
}

export const checkBirth = async (req, res, next) => {
    const birthDate = await req.body.birthDate

    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    if (age < 14 || (age === 14 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
        return res.status(400).json({message: "Debes ser mayor de 14 años"})
    }

    next()
}
