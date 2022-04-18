import { Router } from "express";
import { activateCard, createCard } from "../controllers/cardController.js";
import validateCompany from "../middlewares/validateCompany.js";
import validateCardSchemaMiddleware from "../middlewares/validateCardSchemaMiddleware.js";
import validateemployee from "../middlewares/validateEmployee.js";

const cardRouter = Router();

cardRouter.post(
  "/employees/:employeeId/create-card",
  validateCompany,
  validateemployee,
  validateCardSchemaMiddleware,
  createCard
);
cardRouter.patch(
  "/employees/:employeeId/card-activation/:cardId",
  validateemployee,
  activateCard
);

export default cardRouter;
