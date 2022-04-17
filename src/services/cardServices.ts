import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository.js";
import { createHash } from "../utils/hashUtils.js";

export function generateNewCardData(flag: string) {
  const number = faker.finance.creditCardNumber(flag);
  const cvv = faker.finance.creditCardCVV();
  const cvvHashed = createHash(cvv);
  const expirationDate = dayjs().add(5, "year").format("MM/YY");

  return { number, cvvHashed, expirationDate };
}
export async function verifyCardUnicity(type, employeeId: number) {
  const result = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
  if (result)
    throw {
      type: "conflict",
      message: "Cannot create 2 cards of the same type",
    };
}
export async function createNewCard(card) {
  await cardRepository.insert(card);
}
