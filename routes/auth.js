import { Router } from 'express';
import { login, register } from '../controllers/authControllers.js';

const router = Router();

router.post('/login', login);
router.post('/register', register); // 👈 Debe existir esta línea

export default router;