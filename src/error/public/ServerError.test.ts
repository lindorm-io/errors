import { ServerError } from "./ServerError";
import { ExtendableError } from "./ExtendableError";
import { ServiceError } from "../private/ServiceError";

describe("ServerError", () => {
  describe("instanceOf", () => {
    test("should be an Error", () => {
      expect(new ServerError("message")).toStrictEqual(expect.any(Error));
    });

    test("should be an ExtendableError", () => {
      expect(new ServerError("message")).toStrictEqual(expect.any(ExtendableError));
    });

    test("should be a ServiceError", () => {
      expect(new ServerError("message")).toStrictEqual(expect.any(ServiceError));
    });

    test("should be an ServerError", () => {
      expect(new ServerError("message").name).toBe("ServerError");
    });
  });

  describe("statusCode", () => {
    test("should automatically set statusCode", () => {
      expect(new ServerError("message").statusCode).toBe(500);
    });

    test("should use statusCode", () => {
      expect(new ServerError("message", { statusCode: 501 }).statusCode).toBe(501);
    });
  });

  describe("static", () => {
    test("should get StatusCode", () => {
      expect(ServerError.StatusCode.NOT_IMPLEMENTED).toBe(501);
    });
  });
});
