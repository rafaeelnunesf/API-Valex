import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import rechargeSchema from "../schemas/rechargeSchema.js";
import * as transactionsController from "../controllers/transactionsController.js";
import paymentSchema from "../schemas/paymentSchema.js";

const transactionsRouter = Router();
transactionsRouter.post(
  "/recharge/:cardId",
  validateSchemaMiddleware(rechargeSchema),
  transactionsController.addRecharge
);
transactionsRouter.post(
  "/business/:businessId/payment/:cardId",
  validateSchemaMiddleware(paymentSchema),
  transactionsController.addPayment
);

export default transactionsRouter;
