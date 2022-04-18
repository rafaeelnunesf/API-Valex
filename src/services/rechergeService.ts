import * as rechargeRepository from "../repositories/rechargeRepository.js";
export async function insertRecharge(cardId: number, amount: number) {
  await rechargeRepository.insert({ cardId, amount });
}
