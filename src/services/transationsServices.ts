import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
export async function verifyCardAndBusinessType(
  cardType: string,
  businessType: string
) {
  if (cardType !== businessType)
    throw {
      type: "unauthorized",
      message: `The card type must be ${businessType}`,
    };
}

export async function verifiIfAmountIsGreaterThanBalance(
  amount: number,
  balance: number
) {
  if (amount > balance)
    throw { type: "bad_request", message: "Insufficient funds!" };
}

export async function insertRecharge(cardId: number, amount: number) {
  await rechargeRepository.insert({ cardId, amount });
}

export async function insertPayment(
  cardId: number,
  businessId: number,
  amount: number
) {
  await paymentRepository.insert({ cardId, businessId, amount });
}
