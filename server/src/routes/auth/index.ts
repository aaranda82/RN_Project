import Router from 'express';
import login from './login';
import register from './register';

const router = Router();

router.use('/register', register);
router.use('/login', login);

export default router;
