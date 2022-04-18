import { Request, Response } from "express";
import * as employeeServices from "../services/employeeServices.js";
import * as cardServices from "../services/cardServices.js";

export async function createCard(req: Request, res: Response) {
  const { type } = req.body;
  const { employee } = res.locals;
  const flag = "mastercard";
  const newCardData = cardServices.generateNewCardData(flag);
  const cardholderName = employeeServices.generateCardName(employee.fullName);

  await cardServices.verifyCardUnicity(type, employee.id as number);

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

  await cardServices.createNewCard(card);

  res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
  const { cvv, password } = req.body;
  const cardId = parseInt(req.params.cardId);
  const cardData = await cardServices.checkCardExistence(cardId);

  await cardServices.checkIfPasswordIsNull(cardData.password);
  await cardServices.verifyCVV(cardData.securityCode, cvv);
  await cardServices.checkCardExpirationDate(cardData.expirationDate);
  await cardServices.verifyPasswordLength(password);
  await cardServices.createPassword(cardId, cardData, password);

  res.sendStatus(200);
}

export async function viewCardBalance(req: Request, res: Response) {
  const cardId = parseInt(req.params.cardId);
  const cardData = await cardServices.checkCardExistence(cardId);
  const payments = await cardServices.getPayments(cardId);
  const recharges = await cardServices.getRecharges(cardId);

  res.sendStatus(200);
}
