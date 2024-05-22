import User from '../models/User';
import Score from '../models/Score';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

const expires = 86400 // 24 hours

export const signUp = async (req, res) => {
    try {
        const { name, lastname, email, birthDate, password, roles } = req.body;
        const encryptedPassword = await User.encryptPassword(password);
        const newUser = new User({
            name,
            lastname,
            email,
            birthDate,
            password: encryptedPassword
        });

        if(roles) {
            const foundRoles = await Role.find({name: {$in: roles}})
            newUser.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Role.findOne({name: 'user'})
            newUser.roles = [role._id]
        }

        const savedUser = await newUser.save();

        console.log('Usuario guardado:', savedUser);

        const newScore = new Score({
            userId: savedUser._id
        });

        const savedScore = await newScore.save();


        console.log('Score guardado:', savedScore);

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: expires
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error durante el registro:', error);
        res.status(500).json({ message: 'Error durante el registro', error });
    }
};

export const signIn = async (req, res) => {

    console.log(req.body);
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) {
        return res.status(401).json({ token: null, message: 'Contraseña inválida' });
    }

    const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: expires})

    console.log(userFound);
    res.json({token: token, roles: userFound.roles});
}