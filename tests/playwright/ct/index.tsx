import React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import '../../../src/index.scss';
import { resolveElements } from './_helpers/resolveElements';
import { resolveStory } from './_helpers/resolveStory';

type MountParams = {
  props?: Record<string, unknown>;
  story: string;
};

// The functions are defined below, the `mount` fixture calls them
type ComponentTestingWindow = Window & {
  mount?: (params: MountParams) => Promise<void>;
  unmount?: () => void;
};

const componentTestingWindow = window as ComponentTestingWindow;

/**
 * Playwright Component Testing page used by the `mount` fixture.
 *
 * The fixture navigates to this page and calls `window.mount({ story, props })` with a story ID (see `resolveStory`)
 * and the props of the story. Element descriptors in the props are turned into React elements (see
 * `resolveElements`). `window.unmount()` unmounts the story.
 *
 * @see https://playwright.dev/docs/test-components
 */

// The root is reused across `mount()` calls so that `update()` reconciles the story instead of remounting it
let root: Root | null = null;

componentTestingWindow.mount = async ({
  props,
  story,
}) => {
  const Story = await resolveStory(story);
  const storyProps = resolveElements(props ?? {}) as Record<string, unknown>;

  if (!root) {
    root = createRoot(document.getElementById('root') as HTMLElement);
  }

  const mountedRoot = root;

  // Render synchronously so that the story is in the DOM when `mount()` resolves and a render error rejects it
  flushSync(() => {
    mountedRoot.render(
      <React.StrictMode>
        <Story {...storyProps} />
      </React.StrictMode>,
    );
  });
};

componentTestingWindow.unmount = () => {
  if (root) {
    root.unmount();
    root = null;
  }
};
