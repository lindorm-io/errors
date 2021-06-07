import { ExtendableError } from "./ExtendableError";
import { ExtendableErrorOptions } from "../../typing";

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
  });

  describe("inheritance", () => {
    const error = new Error("error");
    const extended = new ExtendedError("extended", {
      error,
      developer: {
        debug: { debug: "debug" },
        details: "details",
      },
      public: {
        data: { data: "data" },
        description: "description",
        title: "title",
      },
    });

    test("should store normal error on context", () => {
      expect(new ExtendedError("message", { error })).toStrictEqual(
        expect.objectContaining({
          errors: [error],
          developer: expect.objectContaining({
            trace: ["Error: error"],
          }),
        }),
      );
    });

    test("should store normal error on context", () => {
      expect(new ExtendedError("message", { error: extended })).toStrictEqual(
        expect.objectContaining({
          errors: [error, extended],
          developer: expect.objectContaining({
            trace: ["Error: error", "ExtendedError: extended"],
          }),
        }),
      );
    });

    test("should inherit values from extendable errors", () => {
      expect(new ExtendedError("message", { error: extended })).toStrictEqual(
        expect.objectContaining({
          developer: expect.objectContaining({
            debug: { debug: "debug" },
            details: "details",
          }),
          public: {
            data: { data: "data" },
            description: "description",
            title: "title",
          },
        }),
      );
    });
  });
});
