import * as companyRepository from "../repositories/companyRepository.js";
export async function validateCompany(apiKey: string) {
  const company = await companyRepository.findByApiKey(apiKey);
  if (!company) throw { type: "not_found", message: "invalid api-key!" };
  return company;
}
