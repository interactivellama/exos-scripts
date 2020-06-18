import spawn from "cross-spawn";
import path from "path";
import type { SpawnSyncReturns } from "child_process";

describe("stylelint", () => {
  let scriptPath: string;
  let fileToTestPath: string;
  let args: string[];
  let results: SpawnSyncReturns<string>;

  describe("when linting a SASS file with CSS Modules with no errors", () => {
    beforeAll(() => {
      scriptPath = path.resolve(process.cwd(), "./lib/exos-scripts.js");
      fileToTestPath = path.resolve(process.cwd(), "./src/scripts/stylelint/mocks/sass-and-css-modules.scss");
      args = ["stylelint", `--files=${fileToTestPath}`];
      results = runScript(scriptPath, args);
    });

    it("should not output stylelint errors", () => {
      const hasErrorMessage = results.stdout.indexOf("❌ There were errors while running stylelint.") !== -1;
      expect(hasErrorMessage).toBe(false);
    });

    it("should exit with status code 0", () => {
      expect(results.status).toBe(0);
    });
  });

  describe("when linting a SASS file with CSS Modules with errors", () => {
    beforeAll(() => {
      scriptPath = path.resolve(process.cwd(), "./lib/exos-scripts.js");
      fileToTestPath = path.resolve(process.cwd(), "./src/scripts/stylelint/mocks/failing-test-cases.scss");
      args = ["stylelint", `--files=${fileToTestPath}`];
      results = runScript(scriptPath, args);
    });

    it("should output stylelint errors", () => {
      const hasErrorMessage = results.stdout.indexOf("❌ There were errors while running stylelint.") !== -1;
      expect(hasErrorMessage).toBe(true);
    });

    it("should exit with status code 0", () => {
      expect(results.status).toBe(0);
    });
  });
});

function runScript(scriptPath: string, args: string[]): SpawnSyncReturns<string> {
  const results = spawn.sync("node", [scriptPath, ...args], { encoding: "utf8" });
  return results;
}
