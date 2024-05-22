import jwt from 'jsonwebtoken';
import User from '../models/User'
import Score from '../models/Score'
import config from "../config";
import Role from '../models/Role';

export const getUserInfo = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).json({ message: "No se proporcionó el token" });
        }

        const decoded = jwt.verify(token, config.SECRET);
        const userId = decoded.id;

        // Obtener la información básica del usuario
        const user = await User.findById(userId, 'name lastname email birthDate');
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Obtener el mejor puntaje de Spam y Phishing del usuario
        const userScores = await Score.findOne({ userId });
        let maxScoreSpam = 0;
        let maxScorePhishing = 0;
        if (userScores) {
            maxScoreSpam = Math.max(...userScores.scoreSpam);
            maxScorePhishing = Math.max(...userScores.scorePhishing);
        }

        // Obtener el puntaje promedio de Spam y Phishing del usuario
        let avgScoreSpam = 0;
        let avgScorePhishing = 0;
        let scoreCountSpam = 0;
        let scoreCountPhishing = 0;
        let scoresSpam = userScores.scoreSpam
        let scoresPhishing = userScores.scorePhishing
        if (userScores) {
            const { scoreSpam, scorePhishing } = userScores;
            const sumSpam = scoreSpam.reduce((acc, val) => acc + val, 0);
            const sumPhishing = scorePhishing.reduce((acc, val) => acc + val, 0);
            scoreCountSpam = scoreSpam.length
            scoreCountPhishing = scorePhishing.length
            avgScoreSpam = (scoreSpam.length > 0 ? sumSpam / scoreSpam.length : 0).toFixed(2);
            avgScorePhishing = (scorePhishing.length > 0 ? sumPhishing / scorePhishing.length : 0).toFixed(2);
        }

        res.status(200).json({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            birthDate: user.birthDate,
            scoresSpam,
            scoresPhishing,
            maxScoreSpam,
            maxScorePhishing,
            avgScoreSpam,
            avgScorePhishing,
            scoreCountSpam,
            scoreCountPhishing,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la información del usuario" });
    }
};

export const setUserSpamScore = async (req, res) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) {
            return res.status(403).json({ message: "No se proporcionó el token" });
        }

        const decoded = jwt.verify(token, config.SECRET);
        
        const userId = decoded.id;

        const { score } = req.body; // Solo necesitas recibir el puntaje del cuerpo de la solicitud

        const existingScore = await Score.findOne({ userId });

        if (!existingScore) {
            // Si no existe un puntaje para este usuario, crea uno nuevo
            const newScore = new Score({
                userId,
                scoreSpam: [score], // Guarda el puntaje de Spam como un arreglo de números
            });

            await newScore.save();
        } else {
            // Si ya existe un puntaje, añade el nuevo puntaje de Spam al arreglo existente
            existingScore.scoreSpam.push(score);
            await existingScore.save();
        }

        res.status(200).json({ message: 'Puntaje de Spam añadido correctamente' });
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Token inválido' });
        }
        res.status(500).json({ message: 'Error al añadir puntaje de Spam' });
    }
};

export const setUserPhishingScore = async (req, res) => {
        try {
            const token = req.headers["x-access-token"];
    
            if (!token) {
                return res.status(403).json({ message: "No se proporcionó el token" });
            }
    
            const decoded = jwt.verify(token, config.SECRET);
            
            const userId = decoded.id;
    
            const { score } = req.body; // Solo necesitas recibir el puntaje del cuerpo de la solicitud
    
            const existingScore = await Score.findOne({ userId });
    
            if (!existingScore) {
                // Si no existe un puntaje para este usuario, crea uno nuevo
                const newScore = new Score({
                    userId,
                    scorePhishing: [score], // Guarda el puntaje de Spam como un arreglo de números
                });
    
                await newScore.save();
            } else {
                // Si ya existe un puntaje, añade el nuevo puntaje de Spam al arreglo existente
                existingScore.scorePhishing.push(score);
                await existingScore.save();
            }
    
            res.status(200).json({ message: 'Puntaje de Phishing añadido correctamente' });
        } catch (error) {
            console.error(error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Token inválido' });
            }
            res.status(500).json({ message: 'Error al añadir puntaje de Spam' });
        }
    };

export const getAdminInfo = async (req, res) => {
        try {
            const token = req.headers["x-access-token"];
    
            if (!token) {
                return res.status(403).json({ message: "No se proporcionó el token" });
            }
    
            const decoded = jwt.verify(token, config.SECRET);
            const adminId = decoded.id;
    
            // Verificar si el usuario es admin
            const adminUser = await User.findById(adminId);
            if (!adminUser) {
                return res.status(404).json({ message: "Admin no encontrado" });
            }
    
            const roles = await Role.find({ _id: { $in: adminUser.roles } });
            const isAdmin = roles.some(role => role.name === "admin");
    
            if (!isAdmin) {
                return res.status(403).json({ message: "Requiere un rol con más privilegios" });
            }
    
            // Obtener la información básica del administrador
            const userAdmin = await User.findById(adminId, 'name lastname email birthDate');
    
            // Obtener todos los usuarios
            const users = await User.find();
            
            let totalSpamScores = 0;
            let totalPhishingScores = 0;
            let totalUsers = 0;
            const userSpamScores = [];
            const userPhishingScores = [];
    
            for (const user of users) {
                const userScores = await Score.findOne({ userId: user._id });
    
                if (userScores) {
                    const { scoreSpam, scorePhishing } = userScores;
    
                    const avgScoreSpam = (scoreSpam.reduce((acc, val) => acc + val, 0) / scoreSpam.length) || 0;
                    const avgScorePhishing = (scorePhishing.reduce((acc, val) => acc + val, 0) / scorePhishing.length) || 0;
    
                    userSpamScores.push(avgScoreSpam.toFixed(2));
                    userPhishingScores.push(avgScorePhishing.toFixed(2));
    
                    totalSpamScores += avgScoreSpam;
                    totalPhishingScores += avgScorePhishing;
                    totalUsers++;
                }
            }
    
            const avgUsersSpamScore = (totalUsers > 0 ? totalSpamScores / totalUsers : 0).toFixed(2);
            const avgUsersPhishingScore = (totalUsers > 0 ? totalPhishingScores / totalUsers : 0).toFixed(2);
    
            res.status(200).json({
                name: userAdmin.name,
                lastname: userAdmin.lastname,
                email: userAdmin.email,
                birthDate: userAdmin.birthDate,
                avgUsersSpamScore,
                avgUsersPhishingScore,
                userSpamScores,
                userPhishingScores
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener la información del administrador" });
        }
};