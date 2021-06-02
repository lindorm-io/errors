import { ExtendableError } from "./ExtendableError";

describe("ExtendableError.ts", () => {
  class ExtendedError extends ExtendableError {
    constructor(options?: any) {
      super("message", options);
    }
  }

  test("should be an Error", () => {
    expect(new ExtendedError()).toStrictEqual(expect.any(Error));
  });

  test("should be an ExtendedError", () => {
    expect(new ExtendedError().name).toBe("ExtendedError");
  });

  test("should accept debug", () => {
    expect(new ExtendedError({ debug: { mock: true } }).debug).toStrictEqual({
      mock: true,
    });
  });

  test("should accept details", () => {
    expect(new ExtendedError({ details: "details" }).details).toBe("details");
  });

  test("should accept errorCode", () => {
    expect(new ExtendedError({ errorCode: "errorCode" }).errorCode).toBe("errorCode");
  });

  test("should accept originalError", () => {
    expect(new ExtendedError({ originalError: new Error("original") }).originalError).toStrictEqual(
      new Error("original"),
    );
  });

  test("should accept publicData", () => {
    expect(new ExtendedError({ publicData: { num: 400 } }).publicData).toStrictEqual({ num: 400 });
  });
});
