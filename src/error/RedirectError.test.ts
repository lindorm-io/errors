import { ExtendableError } from "./ExtendableError";
import { RedirectError } from "./RedirectError";
import { LindormError } from "./LindormError";

describe("RedirectError", () => {
  describe("instanceOf", () => {
    test("should be an Error", () => {
      expect(new RedirectError("message", { redirect: "redirect" })).toStrictEqual(expect.any(Error));
    });

    test("should be an ExtendableError", () => {
      expect(new RedirectError("message", { redirect: "redirect" })).toStrictEqual(expect.any(ExtendableError));
    });

    test("should be an LindormError", () => {
      expect(new RedirectError("message", { redirect: "redirect" })).toStrictEqual(expect.any(LindormError));
    });

    test("should be a RedirectError", () => {
      expect(new RedirectError("message", { redirect: "redirect" }).name).toBe("RedirectError");
    });

    test("should contain redirect string", () => {
      expect(new RedirectError("message", { redirect: "redirect" }).redirect).toBe("redirect");
    });
  });
});
