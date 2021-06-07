import { ExtendableError } from "./ExtendableError";
import { HttpStatusError } from "./HttpStatusError";

describe("HttpStatusError", () => {
  class ExtendedError extends HttpStatusError {
    public constructor(message: string, options: any) {
      super(message, options);
    }
  }

  describe("instanceOf", () => {
    test("should be an Error", () => {
      expect(new ExtendedError("message", { statusCode: 100 })).toStrictEqual(expect.any(Error));
    });

    test("should be an ExtendableError", () => {
      expect(new ExtendedError("message", { statusCode: 100 })).toStrictEqual(expect.any(ExtendableError));
    });

    test("should be a HttpStatusError", () => {
      expect(new ExtendedError("message", { statusCode: 100 })).toStrictEqual(expect.any(HttpStatusError));
    });
  });
});
