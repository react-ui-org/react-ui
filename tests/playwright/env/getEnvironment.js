/**
 * Process environment file arguments.
 *
 * Default values are used if the variable is not specified.
 */
export const getEnvironment = (environmentArgs) => {
  const {
    PW_CT_PORT,
    PW_WORKERS,
  } = environmentArgs;

  return {
    CT_PORT: Number(PW_CT_PORT) || 3100,
    WORKERS: Number(PW_WORKERS) || 1,
  };
};
