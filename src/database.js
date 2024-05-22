import mongoose from "mongoose";
import config from './config'

mongoose.connect(config.MONGO_CONNECT)
    .then(db => console.log('Conected to MongoDB'))
    .catch(error => console.log(error))