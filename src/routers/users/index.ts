import { Router } from "express";
import userControllers from "../../api/v1/users/controllers/users"

const { getUsers, postAnUser, getAnUser, updateUser, updateUserInfo } = userControllers;
const router = Router();

router.get('/', getUsers);
router.get('/:email', getAnUser);
router.post('/', postAnUser);
router.put('/:email', updateUser);
router.put('/update/:email', updateUserInfo);

export default router;