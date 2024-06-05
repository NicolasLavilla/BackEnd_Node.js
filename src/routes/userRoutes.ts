import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { container } from '../container.js';

const userRoutes = Router();
const userController = container.resolve<UserController>('userController');

userRoutes.get('/:token', (req, res) => userController.getUserById(req, res));
userRoutes.get('/all/:token', (req, res) => userController.getAllUsers(req, res));
userRoutes.post('/register', (req, res) => userController.register(req, res));
userRoutes.post('/login', (req, res) => userController.login(req, res));
userRoutes.put('/update/:token', (req, res) => userController.update(req, res));
//userRoutes.post('/delete', (req, res) => userController.delete(req, res));

export {userRoutes};




