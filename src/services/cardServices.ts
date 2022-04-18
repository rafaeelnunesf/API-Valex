import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import * as cardRepository from "../repositories/cardRepository.js";
import { compareHash, createHash } from "../utils/hashUtils.js";

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

export async function checkCardExistence(cardId: number) {
  const cardData = await cardRepository.findById(cardId);
  if (!cardData) throw { type: "not_found", message: "Card not registered!" };
  return cardData;
}

export async function checkCardExpirationDate(expirationDate: string) {
  const currentDate = dayjs().format("MM/YY");
  if (currentDate > expirationDate)
    throw { type: "bad_request", message: "This card is expired!" };
}

export async function checkIfPasswordIsNull(password: string) {
  if (password !== null)
    throw { type: "bad_request", message: "This card is already activated!" };
}

export async function verifyCVV(cvvHashed: string, cvv: string) {
  const validation = compareHash(cvv, cvvHashed);
  if (!validation) throw { type: "unauthorized", message: "CVV is incorrect!" };
}

export async function verifyPasswordLength(password: string) {
  if (password.length !== 4)
    throw {
      type: "unprocessable_entity",
      message: "The password must be 4 digits!",
    };
}

export async function createPassword(
  cardId: number,
  cardData: any,
  password: string
) {
  const hashedPassword = createHash(password);
  const updatedCardData = { ...cardData, password: hashedPassword };
  cardRepository.update(cardId, updatedCardData);
}
