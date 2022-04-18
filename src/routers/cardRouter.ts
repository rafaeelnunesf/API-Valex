import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import validateCompany from "../middlewares/validateCompany.js";
import validateemployee from "../middlewares/validateEmployee.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post(
  "/employees/:employeeId/create-card",
  validateCompany,
  validateemployee,
  validateSchemaMiddleware(cardSchema),
  cardController.createCard
);
cardRouter.patch(
  "/employees/:employeeId/card-activation/:cardId",
  validateemployee,
  cardController.activateCard
);
cardRouter.get(
  "/employees/:employeeId/card-balance/:cardId",
  validateemployee,
  cardController.viewCardBalance
);

export default cardRouter;
