import * as employeeRepository from "../repositories/employeeRepository.js";

export async function validateEmployee(EmployeeId: number) {
  const employee = await employeeRepository.findById(EmployeeId);
  if (!employee)
    throw { type: "unauthorized", message: "Non-existent employee!" };
  return employee;
}

export function generateCardName(employeeName: string) {
  const employeeNameUpperCase = employeeName.toUpperCase();

  const arrSeparateName = employeeNameUpperCase
    .split(" ")
    .filter((name) => name.length >= 3);

  const firstName = arrSeparateName[0];
  const lastName = arrSeparateName[arrSeparateName.length - 1];
  let middleInitials = "";

  if (arrSeparateName.length === 1) return firstName;
  if (arrSeparateName.length === 2) return firstName + lastName;

  for (let i = 1; i < arrSeparateName.length - 1; i++)
    middleInitials += arrSeparateName[i][0];

  return firstName + " " + middleInitials + " " + lastName;
}
