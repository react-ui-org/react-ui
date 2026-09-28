/// <reference types="webpack/module" />
import type { ComponentType } from 'react';

type StoryModule = Record<string, ComponentType<Record<string, unknown>> | undefined>;

const STORY_FILE_PREFIX = './';
const STORY_FILE_SUFFIX = '.story.tsx';

// Story modules are loaded lazily, only when a story from the file is mounted
const storyContext = require.context('../../../../src', true, /\.story\.tsx$/, 'lazy');

const storyFiles = storyContext.keys().map((modulePath) => ({
  id: modulePath.slice(STORY_FILE_PREFIX.length, -STORY_FILE_SUFFIX.length),
  load: () => storyContext(modulePath) as Promise<StoryModule>,
}));

/**
 * Resolve a story ID to the story component.
 *
 * A story is a named export of a `*.story.tsx` file in `src/`. Its ID is the file path relative to `src/` without the
 * `.story.tsx` extension, followed by the export name, e.g. `components/Button/__tests__/Button/ButtonForTest`. Any
 * unique suffix on a `/` boundary is accepted too, e.g. `Button/ButtonForTest`.
 */
export const resolveStory = async (storyId: string) => {
  const separatorIndex = storyId.lastIndexOf('/');

  if (separatorIndex === -1) {
    throw new Error(`Story ID "${storyId}" must have the form "<story file path>/<export name>".`);
  }

  const fileId = storyId.slice(0, separatorIndex);
  const exportName = storyId.slice(separatorIndex + 1);
  const matchingFiles = storyFiles.filter((file) => file.id === fileId || file.id.endsWith(`/${fileId}`));

  if (matchingFiles.length === 0) {
    throw new Error(`No story file matches "${fileId}".`);
  }

  if (matchingFiles.length > 1) {
    throw new Error(`Story file "${fileId}" is ambiguous: ${matchingFiles.map((file) => file.id).join(', ')}.`);
  }

  const storyModule = await matchingFiles[0].load();
  const Story = storyModule[exportName];

  if (!Story) {
    throw new Error(`Story file "${matchingFiles[0].id}" does not export "${exportName}".`);
  }

  return Story;
};
