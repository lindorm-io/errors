import { ServiceError } from "./ServiceError";
import { ExtendableError } from "./ExtendableError";

describe("ServiceError", () => {
  describe("instanceOf", () => {
    test("should be an Error", () => {
      expect(new ServiceError("message", { statusCode: 100 })).toStrictEqual(expect.any(Error));
    });

    test("should be an ExtendableError", () => {
      expect(new ServiceError("message", { statusCode: 100 })).toStrictEqual(expect.any(ExtendableError));
    });

    test("should be an ServiceError", () => {
      expect(new ServiceError("message", { statusCode: 100 }).name).toBe("ServiceError");
    });
  });
});
