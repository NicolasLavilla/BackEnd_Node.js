import express from 'express';
import app from './app.js';
import { Console } from './config/console.js';
import dotenv from 'dotenv';

const server = express();
dotenv.config();

const consoleServer = new Console('SERVER');
const PORT = process.env.PORT;

server.use(app);

server.listen(PORT, () => {
    try{
        consoleServer.success(`Servidor Express.js en funcionamiento en el puerto ${PORT}`);
    }catch (err){
        consoleServer.error('Error al lanzar el servidor');
    }
    
});

