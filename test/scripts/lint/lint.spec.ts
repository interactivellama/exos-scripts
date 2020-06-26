import path from "path";
import { runExosScript } from "../../test-utils";
import type { SpawnSyncReturns } from "child_process";

const MOCKS_FOLDER_PATH = path.resolve(__dirname, "./mocks");
const errorMessage = `✖ 20 problems (8 errors, 12 warnings)`;

describe("lint E2E", () => {
  let args: string[];
  let results: SpawnSyncReturns<string>;

  describe("when linting a file with no errors", () => {
    beforeAll(() => {
      args = ["lint", `--files=${MOCKS_FOLDER_PATH}/passing-file.ts`];
      results = runExosScript(args);
    });

    it("should not output errors", () => {
      expect(results.stdout.includes(errorMessage)).toBe(false);
    });

    it("should exit with status code 0", () => {
      expect(results.status).toBe(0);
    });
  });

  describe("when linting a file with errors", () => {
    beforeAll(() => {
      args = ["lint", `--files=${MOCKS_FOLDER_PATH}/failing-file.ts`];
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
