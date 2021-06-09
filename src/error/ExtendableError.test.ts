import { ExtendableError } from "./ExtendableError";
import { ExtendableErrorOptions } from "./ExtendableError";

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
    test("should set options", () => {
      expect(
        new ExtendedError("message", {
          code: "code",
          data: { value: "data" },
          debug: { value: "debug" },
          description: "description",
          title: "title",
        }),
      ).toStrictEqual(
        expect.objectContaining({
          code: "code",
          data: { value: "data" },
          debug: { value: "debug" },
          description: "description",
          title: "title",
        }),
      );
    });
  });

  describe("inheritance", () => {
    const error = new Error("error");
    const extended = new ExtendedError("extended", {
      error,
      code: "code",
      data: { value: "data" },
      debug: { value: "debug" },
      description: "description",
      title: "title",
    });

    test("should store normal error on context", () => {
      expect(new ExtendedError("message", { error })).toStrictEqual(
        expect.objectContaining({
          errors: [error],
          trace: ["Error: error"],
        }),
      );
    });

    test("should store extended error on context", () => {
      expect(new ExtendedError("message", { error: extended })).toStrictEqual(
        expect.objectContaining({
          errors: [error, extended],
          trace: ["Error: error", "ExtendedError: extended"],
        }),
      );
    });

    test("should inherit values from extendable errors", () => {
      expect(new ExtendedError("message", { error: extended })).toStrictEqual(
        expect.objectContaining({
          code: "code",
          data: { value: "data" },
          debug: { value: "debug" },
          description: "description",
          title: "title",
        }),
      );
    });
  });
});
