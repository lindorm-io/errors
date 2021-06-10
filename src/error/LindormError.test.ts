import { ExtendableError } from "./ExtendableError";
import { LindormError } from "./LindormError";

describe("LindormError", () => {
  describe("instanceOf", () => {
    test("should be an Error", () => {
      expect(new LindormError("message")).toStrictEqual(expect.any(Error));
    });

    test("should be an ExtendableError", () => {
      expect(new LindormError("message")).toStrictEqual(expect.any(ExtendableError));
    });

    test("should be an LindormError", () => {
      expect(new LindormError("message").name).toBe("LindormError");
    });
  });
});
