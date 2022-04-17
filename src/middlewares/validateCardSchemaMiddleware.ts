import { NextFunction, Request, Response } from "express";
import cardSchema from "../schemas/cardSchema.js";
export default async function validateCardSchemaMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  const validation = cardSchema.validate(data, { abortEarly: false });
  if (validation.error) return res.status(422).send(validation.error.message);

  next();
}
