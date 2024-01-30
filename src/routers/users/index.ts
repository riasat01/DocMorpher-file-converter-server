import { Router } from "express";
import userControllers from "../../api/v1/users/controllers/users"

const { getUsers, postAnUser, getAnUser } = userControllers;
const router = Router();

router.get('/', getUsers);
router.get('/:email', getAnUser);
router.post('/', postAnUser);

export default router;