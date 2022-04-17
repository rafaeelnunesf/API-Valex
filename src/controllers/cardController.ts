import { Request, Response } from "express";
import * as employeeServices from "../services/employeeServices.js";
import * as cardservices from "../services/cardServices.js";
export async function createCard(req: Request, res: Response) {
  const { type } = req.body;
  const { employee } = res.locals;
  const flag = "mastercard";
  const newCardData = cardservices.generateNewCardData(flag);
  const cardholderName = employeeServices.generateCardName(employee.fullName);

  await cardservices.verifyCardUnicity(type, employee.id as number);

  const card = {
    employeeId: employee.id,
    number: newCardData.number,
    cardholderName,
    securityCode: newCardData.cvvHashed,
    expirationDate: newCardData.expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type,
  };

  await cardservices.createNewCard(card);

  res.sendStatus(201);
}
