import * as businessServices from "../repositories/businessRepository.js";

export async function verifyBusinessExistence(businessId: number) {
  const business = await businessServices.findById(businessId);
  if (!business)
    throw { type: "not_found", message: "This business is not registered" };
  return business;
}
