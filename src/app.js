import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'
import {createRoles} from './libs/initialSetup.js';
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'


const app = express()

createRoles()

const path = require('path');


app.set('pkg', pkg);
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/products', productRoutes); // products
app.use('/api/auth', authRoutes); // auth
app.use('/api/user', userRoutes); // user


export default app;