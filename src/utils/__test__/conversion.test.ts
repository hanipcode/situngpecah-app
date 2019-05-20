import * as conversion from '../conversion';


describe("DividedNumber", () => {
  it("return the correct divisiion", () => {
    // 350000 // 100000 === 3
    const dividedNumber = conversion.getDividedNumber(350000, 100000);
    expect(dividedNumber.divided).toEqual(3);
  })
  it("return the correct ammount left from the operation", () => {
    // 350000 // 100000 === 3 and left 50000
    const dividedNumber = conversion.getDividedNumber(350000, 100000);
    expect(dividedNumber.left).toEqual(50000);
  })
  it("given fraction greatter than ammount, divided return 0", () => {
    const dividedNumber = conversion.getDividedNumber(50000, 100000);
    expect(dividedNumber.divided).toEqual(0);
  })
  it("given fraction greater than ammount, left return the ammount itself", () => {
    const dividedNumber = conversion.getDividedNumber(50000, 100000);
    expect(dividedNumber.left).toEqual(50000);
  })
})

describe("Divide Rupiah", () => {
  it("given ammount 350000 return 3 * 100000 and 1 * 50000", () => {
    const divideRupiah = conversion.divideRupiah(350000);
    const { result } = divideRupiah;
    // get 100000
    const firstFraction = result.filter((res) => res.fractionType === 100000);
    // get 50000
    const secondFraction = result.filter((res) => res.fractionType === 50000);
    expect(firstFraction[0].count).toEqual(3);
    expect(secondFraction[0].count).toEqual(1);
  })

  it("can handle ammount left", () => {
    // should left 20
    const divideRupiah = conversion.divideRupiah(5170);
    expect(divideRupiah.ammountLeft).toEqual(20);
  })
})
