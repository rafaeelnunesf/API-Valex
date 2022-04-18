import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import rechargeSchema from "../schemas/rechargeSchema.js";
import * as transactionsController from "../controllers/transactionsController.js";

const transactionsRouter = Router();
transactionsRouter.post(
  "/recharge/:cardId",
  validateSchemaMiddleware(rechargeSchema),
  transactionsController.addRecharge
);
transactionsRouter.post("/payment/:cardId");

export default transactionsRouter;
