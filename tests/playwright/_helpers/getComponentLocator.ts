import type { Locator } from '@playwright/test';

/**
 * Get a locator for the component rendered by a story.
 *
 * The `mount` fixture always returns a locator for the page root (`#root`). This function narrows it down:
 *
 * * If the story renders exactly one top-level element, the locator points to that element.
 * * Otherwise (several sibling elements or none), the locator points to the page root itself.
 *
 * This matches the element the former `@playwright/experimental-ct-react` `mount()` returned, so snapshots keep their
 * bounds.
 */
export const getComponentLocator = (component: Locator) => component.locator(
  'xpath=self::*[count(*) = 1]/* | self::*[count(*) != 1]',
);
