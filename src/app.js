import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import { createRoles } from './libs/initialSetup.js';
import productRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import path from 'path';
import cors from 'cors';

const app = express();

// Inicializar roles
createRoles();

// Configurar variables de la aplicación
app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Configurar carpeta de archivos estáticos
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));


app.use(cors());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Ruta raíz para manejar solicitudes a "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

export default app;