/**
 * Deserialize the values recorded by a spy from the value of its hidden input.
 */
export const deserializeSpyValue = (value: string) => JSON.parse(value) as unknown[];
