import { Router } from "express";
import userControllers from "../../api/v1/users/controllers/users"

const { getUsers, postAnUser } = userControllers;
const router = Router();

router.get('/', getUsers);
router.post('/', postAnUser);

export default router;