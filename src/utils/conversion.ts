const AVAILABLE_FRACTIONS = [
  100000,
  50000,
  20000,
  10000,
  5000,
  1000,
  500,
  100,
  50
];

export interface DivideResultItem {
  fractionType: number;
  count: number;
}
interface DivideResult {
  result: Array<DivideResultItem>;
  ammountLeft?: number;
}

interface DividedNumberResult {
  divided: number;
  left: number;
}

export function getDividedNumber(
  currentAmmount: number,
  fraction: number
): DividedNumberResult {
  if (fraction > currentAmmount)
    return {
      divided: 0,
      left: currentAmmount
    };
  const divided = Math.floor(currentAmmount / fraction);
  const left = currentAmmount - fraction * divided;
  return {
    divided,
    left
  };
}

export function divideRupiah(ammount: number): DivideResult {
  let result: Array<DivideResultItem> = [];
  let currentAmmount = ammount;
  AVAILABLE_FRACTIONS.forEach(fraction => {
    if (fraction > currentAmmount) return;
    if (currentAmmount === 0) return;
    const dividedNumber = getDividedNumber(currentAmmount, fraction);
    currentAmmount = dividedNumber.left;
    result.push({
      fractionType: fraction,
      count: dividedNumber.divided
    });
  });
  return {
    result,
    ammountLeft: currentAmmount
  };
}
