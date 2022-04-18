import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(
  error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "not_found")
    return res.status(404).send(error.message ? error.message : "Not found!");
  if (error.type === "unauthorized")
    return res
      .status(401)
      .send(error.message ? error.message : "Unauthorized!");
  if (error.type === "conflict")
    return res.status(409).send(error.message ? error.message : "Conflict!");
  if (error.type === "bad_request")
    return res.status(400).send(error.message ? error.message : "Bad Request!");
  if (error.type === "unprocessable_entity")
    return res
      .status(422)
      .send(error.message ? error.message : "Unprocessable Entity!");
  res.sendStatus(500);
}
