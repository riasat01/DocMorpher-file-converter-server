import { Router } from "express";
import createPaymentIntent from "../../api/v1/payment/controllers/payment";

const router = Router();

router.post('/', createPaymentIntent);

export default router;