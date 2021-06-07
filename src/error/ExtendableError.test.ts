import { ExtendableError } from "./ExtendableError";
import { ExtendableErrorOptions } from "../typing";

describe("ExtendableError", () => {
  class ExtendedError extends ExtendableError {
    public constructor(message: string, options?: ExtendableErrorOptions) {
      super(message, options);
    }
  }

  describe("instanceOf", () => {
    test("should be an Error", () => {
      expect(new ExtendedError("message")).toStrictEqual(expect.any(Error));
    });

    test("should be an ExtendedError", () => {
      expect(new ExtendedError("message").name).toBe("ExtendedError");
    });
  });

  describe("options", () => {
    test("should set developer info", () => {
      expect(
        new ExtendedError("message", {
          developer: {
            debug: { value: "debug" },
            details: "details",
          },
        }),
      ).toStrictEqual(
        expect.objectContaining({
          developer: {
            debug: { value: "debug" },
            details: "details",
            trace: [],
          },
        }),
      );
    });

    test("should set public info", () => {
      expect(
        new ExtendedError("message", {
          public: {
            data: { value: "data" },
            description: "description",
            title: "title",
          },
        }),
      ).toStrictEqual(
        expect.objectContaining({
          public: {
            data: { value: "data" },
            description: "description",
            title: "title",
          },
        }),
      );
    });

    test("should set error on trace", () => {
      const error = new Error("Error Message");

      const extended1 = new ExtendedError("Extended Error Message", { error });
      const extended2 = new ExtendedError("message", { error: extended1 });

      expect(extended1).toStrictEqual(
        expect.objectContaining({
          errors: [error],
          developer: expect.objectContaining({
            trace: ["Error: Error Message"],
          }),
        }),
      );

      expect(extended2).toStrictEqual(
        expect.objectContaining({
          errors: [error, extended1],
          developer: expect.objectContaining({
            trace: ["Error: Error Message", "ExtendedError: Extended Error Message"],
          }),
        }),
      );
    });
  });
});
