import {
  checkIsValid,
  removeZeroPad,
  getParsedNumber,
  validateInput,
  removeDot
} from "../inputValidator";

describe("RemoveZeroPad", () => {
  it(" can remove the zero padding", () => {
    expect(removeZeroPad("0500")).toEqual("500");
  });
});

describe("removeDot", () => {
  it("can remove the dot from number string", () => {
    expect(removeDot("5.000")).toEqual("5000");
  });
});

describe("getParsedNumber", () => {
  it("can parse with Rp", () => {
    expect(getParsedNumber("Rp 4000")).toEqual("4000");
  });
  it("can parse with dot", () => {
    expect(getParsedNumber("Rp. 4.000")).toEqual("4.000");
  });
});

describe("checkIsValid", () => {
  it("given space operator is not valid", () => {
    expect(checkIsValid("Rp 4 000")).toEqual(false);
  });

  it("given comma separator is not valid", () => {
    expect(checkIsValid("Rp 4,000")).toEqual(false);
  });

  it("given Rp is in the end of string is not valid", () => {
    expect(checkIsValid("4.000 Rp")).toEqual(false);
  });

  it("can check valid input", () => {
    expect(checkIsValid("Rp. 4.000")).toEqual(true);
    expect(checkIsValid("4.000")).toEqual(true);
    expect(checkIsValid("Rp 4.000")).toEqual(true);
  });
});

describe("validateInput", () => {
  it("can check if input not valid", () => {
    expect(validateInput("4000 Rp")).toEqual(null);
  });

  it("given valid input it return number", () => {
    expect(validateInput("Rp. 4000")).toEqual(4000);
  });
});
