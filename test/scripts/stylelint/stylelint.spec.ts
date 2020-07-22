import type { SpawnSyncReturns } from 'child_process';
import { runExosScript } from '../../test-utils';

/**
 * Using relative path here due to an issue with stylelint path resolution:
 * it does not work with Windows style paths correctly
 */
const MOCKS_FOLDER_PATH = 'test/**';
const errorMessage = '❌ There were errors while running stylelint.';

describe('stylelint E2E', () => {
  let args: string[];
  let results: SpawnSyncReturns<string>;

  describe('when stylelinting a file with no errors', () => {
    beforeAll(() => {
      args = ['stylelint', `--files=${MOCKS_FOLDER_PATH}/viable.scss`];
      results = runExosScript(args);
    });

    it('should not output errors', () => {
      expect(results.stdout).not.toContain(errorMessage);
    });

    it('should exit with status code 0', () => {
      expect(results.status).toBe(0);
    });
  });

  describe('when stylelinting a file with errors', () => {
    beforeAll(() => {
      args = ['stylelint', `--files=${MOCKS_FOLDER_PATH}/failing.scss`];
      results = runExosScript(args);
    });

    it('should output errors', () => {
      expect(results.stdout).toContain(errorMessage);
    });

    it('should exit with status code 1', () => {
      expect(results.status).toBe(1);
    });
  });
});
