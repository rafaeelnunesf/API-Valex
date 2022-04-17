import { Router } from "express";
import { createCard } from "../controllers/cardController.js";
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

export default cardRouter;
