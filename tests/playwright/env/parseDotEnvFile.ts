import dotenv from 'dotenv';

const PLAYWRIGHT_ENV_FILE = '.env.playwright';

/**
 * Load and parse Playwright environment file into an object.
 */
export const parseDotEnvFile = () => {
  const dotEnvConfigOutput = dotenv.config({
    path: PLAYWRIGHT_ENV_FILE,
    quiet: true,
  });

  if (dotEnvConfigOutput.error) {
    // eslint-disable-next-line no-console
    console.info(`Create ${PLAYWRIGHT_ENV_FILE} file in the root directory of the project to customize Playwright environment.`);
  }

  return dotEnvConfigOutput.parsed || {};
};
