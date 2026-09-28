---
paths:
  - "**/*.spec.tsx"
  - "**/*.story.tsx"
  - "**/__tests__/**"
  - "tests/**"
---

# Testing

## Commands

* Run all Jest unit tests with `npm run test:jest`. For a single file:
  `npm run test:jest -- <file>`.
* Run all Playwright component tests with `npm run test:playwright-ct:all`; for
  one component, `npm run test:playwright-ct:all -- -- src/components/Button`.
* Update Playwright snapshots with `npm run test:playwright-ct:all-with-update`.
* Serve the report with `npm run test:playwright-ct:show-report`.

## Testing

Create/update tests for added or changed components and helpers, and remove
obsolete tests when functionality is removed. Never leave a component or helper
without tests. When fixing a bug, add a test that fails before the fix and
passes after it.

### Organization

Jest unit/component tests are co-located in a component's `__tests__/` folder.

### Playwright component tests

`.spec.tsx` specs use a table-driven pattern:

* Import `test` and `expect` from `tests/playwright`, never directly from
  `@playwright/test`; its `mount` moves the pointer out of the viewport so
  components do not get into `:hover` state.
* Mount stories by ID (`<StoryFile>/<StoryExport>`, e.g.
  `Button/ButtonForTest`) through the Playwright Component Testing page in
  [tests/playwright/ct/](../../tests/playwright/ct), passing plain data props
  only. Describe elements passed in props (icons, nodes) with `element()` from
  `tests/playwright`. Callbacks are asserted through `*SpyForTest` stories
  wrapped with `withSpy` that register the callbacks with `useSpy`; specs read
  the recorded values with `expect.poll(() => component.getSpyValue(name))`.
* Import arrays of test cases from `_propTests/` directories and from shared
  `tests/playwright/propTests/`.
* Each test case is `{ name, props, onBeforeTest?, onBeforeSnapshot? }`; custom
  field tests add `customFieldLayoutProps`, `customFieldProps`, etc.
* `mixPropTests([...arrays])` generates the cartesian product of multiple prop
  arrays.
* `propTests` from `tests/playwright/` provides standard reusable test sets
  (e.g. `layoutPropTest`, `sizePropTest`, `disabledPropTest`).
* Snapshot images are stored alongside the spec file in
  `<ComponentName>.spec.tsx-snapshots/`.

**Story components** (`.story.tsx`) wrap the real component in a minimal fixture
(sometimes inside a context provider) and are mounted by ID from `.spec.tsx`
files. They run in the browser, so they import `withSpy` / `useSpy` from
`tests/playwright/utils/spy`, not from `tests/playwright`. Type them with the
real component props; when the story fills in a default for a required prop, use
`StoryProps<Props, 'key'>` from `tests/playwright` instead of hand-written
`Omit & { key?: … }` types. Naming convention: `<ComponentName>ForTest`,
`<ComponentName>ForRefTest`, `<ComponentName>SpyForTest`,
`<ComponentName>ForFormLayoutTests` — the FormLayout story component is always
last.

**Test describe structure:** `test.describe('ComponentName')` →
`test.describe('base')` (if present) → `visual` / `non-visual` /
`functionality`; the `formLayout` describe is always the last block at the same
level as `base`.

## Reference

* [Testing Guidelines](../../src/docs/contribute/testing-guidelines.md)
