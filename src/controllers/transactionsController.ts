import { Request, Response } from "express";
import * as rechargeServices from "../services/rechergeService.js";
import * as cardServices from "../services/cardServices.js";
export async function addRecharge(req: Request, res: Response) {
  const cardId = parseInt(req.params.cardId);
  const { amount } = req.body;
  const cardData = await cardServices.checkCardExistence(cardId);
  await cardServices.checkCardExpirationDate(cardData.expirationDate);

  await rechargeServices.insertRecharge(cardId, amount);
  res.sendStatus(201);
}
