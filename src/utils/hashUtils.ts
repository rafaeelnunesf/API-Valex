import bcrypt from "bcrypt";
export function createHash(sensibleData: string): string {
  return bcrypt.hashSync(sensibleData, 10);
}
export function compareHash(sensibleData: string, hash: string): boolean {
  return bcrypt.compareSync(sensibleData, hash);
}
