/**
 * Serialize the values recorded by a spy into the value of its hidden input.
 */
export const serializeSpyValue = (calls: unknown[]) => JSON.stringify(calls);
