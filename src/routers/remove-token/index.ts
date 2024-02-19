import { Router } from 'express';
import removeToken from '../../api/v1/authentication/controllers/removeToken';

const router = Router();

router.post('/', removeToken);

export default router;
