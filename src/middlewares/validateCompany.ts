import { NextFunction, Request, Response } from "express-serve-static-core";
import * as companyServices from "../services/companyServices.js";

export default async function validateCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"] as string;
  const company = await companyServices.validateCompany(apiKey);
  res.locals.company = company;
  next();
}
