import path from 'path';
import type { SpawnSyncReturns } from 'child_process';
import { runExosScript } from '../../test-utils';

const MOCKS_FOLDER_PATH = path.resolve(__dirname, './mocks');
const errorMessage = '✖ 20 problems (8 errors, 12 warnings)';
const warningMessage = '✖ 3 problems (0 errors, 3 warnings)';

describe('lint E2E', () => {
  let args: string[];
  let results: SpawnSyncReturns<string>;

  describe('when linting a file with no errors', () => {
    beforeAll(() => {
      args = ['lint', `--files=${path.join(MOCKS_FOLDER_PATH, 'visable.ts')}`];
      results = runExosScript(args);
    });

    it('should not output errors', () => {
      expect(results.stdout.includes(errorMessage)).toBe(false);
    });

    it('should exit with status code 0', () => {
      expect(results.status).toBe(0);
    });
  });

  describe('when linting a file with errors', () => {
    beforeAll(() => {
      args = ['lint', `--files=${path.join(MOCKS_FOLDER_PATH, 'failing.ts')}`];
      results = runExosScript(args);
    });

    it('should output errors', () => {
      expect(results.stdout.includes(errorMessage)).toBe(true);
    });

    it('should exit with status code 1', () => {
      expect(results.status).toBe(1);
    });
  });

  describe('when linting a file with warnings', () => {
    describe('and --max-warnings is not defined', () => {
      beforeAll(() => {
        args = ['lint', `--files=${path.join(MOCKS_FOLDER_PATH, 'warnings.ts')}`];
        results = runExosScript(args);
      });

      it('should output warnings', () => {
        expect(results.stdout.includes(warningMessage)).toBe(true);
      });

      it('should exit with status code 0', () => {
        expect(results.status).toBe(0);
      });
    });

    describe('and --max-warnings is defined', () => {
      beforeAll(() => {
        args = ['lint', `--files=${path.join(MOCKS_FOLDER_PATH, 'warnings.ts')}`, '--max-warnings=0'];
        results = runExosScript(args);
      });

      it('should output warnings', () => {
        expect(results.stdout.includes(warningMessage)).toBe(true);
      });

      it('should exit with status code 1', () => {
        expect(results.status).toBe(1);
      });
    });
  });
});
