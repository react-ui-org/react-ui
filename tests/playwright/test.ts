import { test as base } from '@playwright/test';
import type {
  Locator,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
  TestType,
} from '@playwright/test';
import { getComponentLocator } from './_helpers/getComponentLocator';
import { parkMouse } from './_helpers/parkMouse';
import { getSpyValue } from './utils/spy';

type StoryProps = Record<string, unknown>;

export type MountResult = Locator & {
  getSpyValue: (name: string) => Promise<unknown[]>;
  unmount: () => Promise<void>;
  update: (props?: StoryProps) => Promise<void>;
};

type Fixtures = {
  mount: (storyId: string, props?: StoryProps) => Promise<MountResult>;
};

// `extend()` would intersect the overridden `mount` with the original one, so the original is omitted from the type
type TestArgs = Omit<PlaywrightTestArgs, 'mount'> & PlaywrightTestOptions & Fixtures;

/**
 * Playwright `test` with the `mount` fixture adjusted for this project.
 *
 * Compared to the `mount` fixture of `@playwright/test`:
 *
 * - the returned locator points to the rendered component, see `getComponentLocator`,
 * - the mouse pointer is parked outside the viewport after mounting, see `parkMouse`,
 * - the returned locator provides `getSpyValue(name)`, see `utils/spy`.
 */
export const test = base.extend<Fixtures>({
  mount: async ({
    mount,
    page,
  }, provideMount) => {
    await provideMount(async (storyId, props) => {
      const root = await mount(storyId, props);

      await parkMouse(page);

      return Object.assign(getComponentLocator(root), {
        getSpyValue: getSpyValue(root),
        unmount: root.unmount,
        update: root.update,
      });
    });
  },
}) as unknown as TestType<TestArgs, PlaywrightWorkerArgs & PlaywrightWorkerOptions>;

export { expect } from '@playwright/test';
