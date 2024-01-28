import { Router } from 'express';
import getAToken from "../../api/v1/authentication/controllers/getToken.ts"
const router = Router();

router.post('/', getAToken);

export default router;
