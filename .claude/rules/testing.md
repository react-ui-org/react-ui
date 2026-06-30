---
paths:
  - "**/*.spec.tsx"
  - "**/*.story.tsx"
  - "**/__tests__/**"
  - "tests/**"
---

# Testing

## Commands

* Run all Jest unit tests with `npm run test:jest` (TS + JS). For a single file:
  `npm run test:jest:ts -- <file>` or `npm run test:jest:js -- <file>`.
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
(sometimes inside a context provider) and are imported only by `.spec.tsx`
files. Naming convention: `<ComponentName>ForTest`, `<ComponentName>ForRefTest`,
`<ComponentName>ForFormLayoutTests` — the FormLayout story component is always
last.

**Test describe structure:** `test.describe('ComponentName')` →
`test.describe('base')` (if present) → `visual` / `non-visual` /
`functionality`; the `formLayout` describe is always the last block at the same
level as `base`.

## Reference

* [Testing Guidelines](../../src/docs/contribute/testing-guidelines.md)
