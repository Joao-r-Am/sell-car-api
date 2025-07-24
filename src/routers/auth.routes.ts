import { Router } from 'express';
import authController from '../controllers/auth.controller';

const auth_router = Router();

auth_router.post('/', authController.register).get('/login', authController.login);

export default auth_router;
