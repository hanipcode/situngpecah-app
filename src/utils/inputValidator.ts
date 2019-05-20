type ammount = number | null;

export function checkIsValid(input: string): boolean {
  // check using regex if have Rp at first, and check for only use valid separator
  const validRe = /^(Rp\.?\s*)?([\d\.][^\s,]+)(,00)?$/gi;
  const parsedInput = validRe.exec(input);
  if (parsedInput === null) return false;
  if (parsedInput[2] === undefined) return false;
  return true;
}

export function getParsedNumber(input: string): string {
  const validRe = /^(Rp\.?\s*)?([\d\.][^\s,]+)(,00)?$/gi;
  const parsedInput = validRe.exec(input)!;
  return parsedInput[2];
}

export function removeZeroPad(input: string): string {
  return input.replace(/^0*/gi, "");
}

export function removeDot(input: string): string {
  return input.replace(/\./gi, "");
}

export function validateInput(inputAmmount: string): ammount {
  const isValid = checkIsValid(inputAmmount);
  if (!isValid) return null;
  const parsedNumber = getParsedNumber(inputAmmount);
  const parsedAmmount = removeDot(removeZeroPad(parsedNumber));
  return parseInt(parsedAmmount);
}
