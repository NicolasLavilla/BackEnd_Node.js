import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { scopePerRequest } from 'awilix-express';
import { container } from './container.js';

/*Importar rutas*/
import {userRoutes} from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Middleware de inyección de dependencias por solicitud
app.use(scopePerRequest(container));

// Rutas
app.use('/api/users', userRoutes );

export default app;
