import { Router } from "express";
import cardRouter from "./cardRouter.js";
import transactionsRouter from "./transactionsRouter.js";
const router = Router();

router.use(cardRouter);
router.use(transactionsRouter);

export default router;
