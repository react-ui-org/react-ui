import type { Locator } from '@playwright/test';
import { deserializeSpyValue } from './_helpers/deserializeSpyValue';

/**
 * Create a function that gets the values recorded by the spy `name` registered with `useSpy` in the story mounted
 * in `root`.
 *
 * The values are recorded asynchronously, so assert them with `expect.poll()`.
 */
export const getSpyValue = (root: Locator) => async (name: string) => deserializeSpyValue(
  await root.getByTestId(name).inputValue(),
);
