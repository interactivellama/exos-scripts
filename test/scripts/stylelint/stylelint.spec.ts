import path from "path";
import { runExosScript } from "../../test-utils";
import type { SpawnSyncReturns } from "child_process";

const MOCKS_FOLDER_PATH = path.resolve(__dirname, "./mocks");
const errorMessage = "❌ There were errors while running stylelint.";

describe("stylelint E2E", () => {
  let args: string[];
  let results: SpawnSyncReturns<string>;

  describe("when stylelinting a file with no errors", () => {
    beforeAll(() => {
      args = ["stylelint", `--files=${MOCKS_FOLDER_PATH}/sass-and-css-modules.scss`];
      results = runExosScript(args);
    });

    it("should not output errors", () => {
      expect(results.stdout.includes(errorMessage)).toBe(false);
    });

    it("should exit with status code 0", () => {
      expect(results.status).toBe(0);
    });
  });

  describe("when stylelinting a file with errors", () => {
    beforeAll(() => {
      args = ["stylelint", `--files=${MOCKS_FOLDER_PATH}/failing-test-cases.scss`];
      results = runExosScript(args);
    });

    it("should output errors", () => {
      expect(results.stdout.includes(errorMessage)).toBe(true);
    });

    it("should exit with status code 1", () => {
      expect(results.status).toBe(1);
    });
  });
});
