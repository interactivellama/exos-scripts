import path from 'path';
import type { SpawnSyncReturns } from 'child_process';
import { runExosScript } from '../../test-utils';

const MOCKS_FOLDER_PATH = path.resolve(__dirname, './mocks');
const errorMessage = '✖ 3 problems (2 errors, 1 warning)';
const warningMessage = '✖ 2 problems (0 errors, 2 warnings)';

describe('lint E2E', () => {
  let args: string[];
  let results: SpawnSyncReturns<string>;

  describe('when linting a file with no errors', () => {
    beforeAll(() => {
      args = ['lint', `--files=${MOCKS_FOLDER_PATH}/viable.ts`];
      results = runExosScript(args);
    });

    it('should not output errors', () => {
      expect(results.stdout).not.toContain(errorMessage);
    });

    it('should exit with status code 0', () => {
      expect(results.status).toBe(0);
    });
  });

  describe('when linting a file with errors', () => {
    beforeAll(() => {
      args = ['lint', `--files=${MOCKS_FOLDER_PATH}/failing.ts`];
      results = runExosScript(args);
    });

    it('should output errors', () => {
      expect(results.stdout).toContain(errorMessage);
    });

    it('should exit with status code 1', () => {
      expect(results.status).toBe(1);
    });
  });

  describe('when linting a file with warnings', () => {
    describe('and --max-warnings is not defined', () => {
      beforeAll(() => {
        args = ['lint', `--files=${MOCKS_FOLDER_PATH}/warnings.ts`];
        results = runExosScript(args);
      });

      it('should output warnings', () => {
        expect(results.stdout).toContain(warningMessage);
      });

      it('should exit with status code 0', () => {
        expect(results.status).toBe(0);
      });
    });

    describe('and --max-warnings is defined', () => {
      beforeAll(() => {
        args = ['lint', `--files=${MOCKS_FOLDER_PATH}/warnings.ts`, '--max-warnings=0'];
        results = runExosScript(args);
      });

      it('should output warnings', () => {
        expect(results.stdout).toContain(warningMessage);
      });

      it('should exit with status code 1', () => {
        expect(results.status).toBe(1);
      });
    });
  });
});
