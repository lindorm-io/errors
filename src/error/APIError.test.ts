import { APIError } from "./APIError";
import { ExtendableError } from "./ExtendableError";

describe("APIError.ts", () => {
  test("should be an Error", () => {
    expect(new APIError("message")).toStrictEqual(expect.any(Error));
  });

  test("should be an ExtendableError", () => {
    expect(new APIError("message")).toStrictEqual(expect.any(ExtendableError));
  });

  test("should be an APIError", () => {
    expect(new APIError("message").name).toBe("APIError");
  });

  test("should accept status", () => {
    expect(new APIError("message", { statusCode: 400 }).statusCode).toBe(400);
  });

  test("should accept title", () => {
    expect(new APIError("message", { title: "title" }).title).toBe("title");
  });
});
