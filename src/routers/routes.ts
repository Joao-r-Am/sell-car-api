import { Router } from 'express';
import auth_router from './auth.routes';

const router = Router();

router.use('/auth', auth_router);

export default router;
