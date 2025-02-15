import { getEnvironment } from './getEnvironment';
import { parseDotEnvFile } from './parseDotEnvFile';

/**
 * Load Playwright's environment file arguments and parse them into one object using `getEnvironment` function.
 */
export const parseEnvironment = () => getEnvironment(parseDotEnvFile());
