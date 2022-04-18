import { Request, Response } from "express";
import * as cardServices from "../services/cardServices.js";
import * as businessServices from "../services/bussinessServices.js";
import * as transationServices from "../services/transationsServices.js";
export async function addRecharge(req: Request, res: Response) {
  const cardId = parseInt(req.params.cardId);
  const { amount } = req.body;
  const cardData = await cardServices.checkCardExistence(cardId);
  await cardServices.checkCardExpirationDate(cardData.expirationDate);

  await transationServices.insertRecharge(cardId, amount);
  res.sendStatus(201);
}

export async function addPayment(req: Request, res: Response) {
  const cardId = parseInt(req.params.cardId);
  const businessId = parseInt(req.params.businessId);
  const { password, amount } = req.body;
  const cardData = await cardServices.checkCardExistence(cardId);
  const businessData = await businessServices.verifyBusinessExistence(
    businessId
  );
  const balance = await cardServices.cardBalance(cardId);

  await cardServices.checkCardExpirationDate(cardData.expirationDate);
  await cardServices.verifiyPassword(cardData.password, password);
  await transationServices.verifyCardAndBusinessType(
    cardData.type,
    businessData.type
  );
  await transationServices.verifiIfAmountIsGreaterThanBalance(amount, balance);
  await transationServices.insertPayment(cardId, businessData.id, amount);

  res.sendStatus(201);
}
