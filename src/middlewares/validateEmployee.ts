import { NextFunction, Request, Response } from "express-serve-static-core";
import * as employeeServices from "../services/employeeServices.js";

export default async function validateemployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const employeeId = parseInt(req.params.employeeId) as number;
  const employee = await employeeServices.validateEmployee(employeeId);
  res.locals.employee = employee;
  next();
}
