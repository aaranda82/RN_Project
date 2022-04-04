import Router from 'express';
import login from './login';
import refresh from './refreshToken';
import register from './register';

const router = Router();

router.use('/register', register);
router.use('/login', login);
router.use('/refresh', refresh);

export default router;
