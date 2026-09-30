# Testing

Tools used to test the application:

* **ESLint** (static code analysis of TypeScript files)
* **Stylelint** (static code analysis of CSS files)
* **Markdownlint** (static code analysis of Markdown files)
* **Jest** (unit tests)
* **Playwright** (visual and functional component testing)

Generally, `npm test` and `npm run test:playwright-ct:all` should be run  within
their designated Docker containers before pushing changes to the repository.

## Tools

You can run all tests with a single command:

```bash
npm run lint && npm test && npm run test:playwright-ct:all
```

### Linters (ESLint, Markdownlint, Stylelint)

Run linters either all together:

```bash
npm run lint
```

or run linters individually:

```bash
npm run <eslint|markdownlint|stylelint>
```

### Jest

```bash
npm run test:jest
```

### Playwright

#### Configuration

Test parameters can be tweaked by creating and tweaking `.env` file.

#### Running Tests

Run tests:

```bash
npm run test:playwright-ct:<all|all-with-update>
```

You can also run specific tests by passing a path to the test files:

```bash
npm run test:playwright-ct:<all|all-with-update> -- -- <match_path>
```

You can also pass any [CLI command][playwright-cli] to the test runner:

```bash
npm run test:playwright-ct:<all|all-with-update> -- -- <cli_argument>
```

#### Writing Tests

Component tests mount *stories*: named exports of the `*.story.tsx` file next
to the spec. Specs import `test` and `expect` from `tests/playwright`, whose
`mount` fixture navigates to the Playwright Component Testing page in
`tests/playwright/ct/` (served by webpack-dev-server, which Playwright
starts automatically) and mounts a story by its ID, which is the story file
name followed by the export name, with plain data props.

Props are sent to the browser as data, so JSX cannot be passed to a story.
Describe elements passed in props with `element()` from `tests/playwright`,
e.g. `element('TestIcon')` or `element('div', { children: 'Label' })`.

Callbacks cannot be passed to a story either. To assert them, add
a `*SpyForTest` story wrapped with `withSpy` that registers the callbacks with
`useSpy`, and read the recorded values in the spec with `getSpyValue`.
`useSpy(name, select)` records `select(...args)` of every call, the first
argument by default. The values are recorded asynchronously, hence
`expect.poll()`.

Visual tests are table-driven. Each test case is
`{ name, props, onBeforeTest?, onBeforeSnapshot? }`. Reusable test cases are
available in `propTests` from `tests/playwright`, component specific ones live
in the `_propTests/` directory next to the spec. `mixPropTests()` combines
multiple arrays of test cases into all their combinations. Snapshots are stored
next to the spec in `<ComponentName>.spec.tsx-snapshots/`.

Story file `src/components/Button/__tests__/Button.story.tsx`:

```tsx
import React from 'react';
import { Button } from '..';
import type { ButtonProps } from '..';
import {
  useSpy,
  withSpy,
} from '../../../../tests/playwright/utils/spy';
import type { StoryProps } from '../../../../tests/playwright';

type ButtonForTestProps = StoryProps<ButtonProps, 'label'>;

export const ButtonForTest = ({
  label = 'Button',
  ...props
}: ButtonForTestProps) => (
  <Button
    label={label}
    {...props}
  />
);

export const ButtonSpyForTest = withSpy((props: ButtonForTestProps) => {
  const onClick = useSpy('onClick', () => true);

  return (
    <ButtonForTest
      onClick={onClick}
      {...props}
    />
  );
});
```

Spec file `src/components/Button/__tests__/Button.spec.tsx`:

```ts
import {
  element,
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';

test.describe('Button', () => {
  test.describe('visual', () => {
    [
      ...propTests.defaultComponentPropTest,
      ...propTests.sizePropTest,
      ...mixPropTests([
        propTests.actionColorPropTest,
        propTests.priorityPropTest,
      ]),
    ].forEach(({
      name,
      onBeforeTest,
      onBeforeSnapshot,
      props,
    }) => {
      test(name, async ({
        mount,
        page,
      }) => {
        if (onBeforeTest) {
          await onBeforeTest(page);
        }

        const component = await mount('Button/ButtonForTest', props);

        if (onBeforeSnapshot) {
          await onBeforeSnapshot(page, component);
        }

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });

  test.describe('non-visual', () => {
    test('id', async ({ mount }) => {
      const component = await mount('Button/ButtonForTest', {
        id: 'testId',
      });

      await expect(component).toHaveAttribute('id', 'testId');
    });
  });

  test.describe('functionality', () => {
    test('calls onClick when clicked', async ({ mount }) => {
      const component = await mount('Button/ButtonSpyForTest');
      await component.getByRole('button').click();

      await expect.poll(() => component.getSpyValue('onClick')).toEqual([true]);
    });

    test('is disabled when feedbackIcon is set', async ({ mount }) => {
      const component = await mount('Button/ButtonSpyForTest', {
        feedbackIcon: element('span', { children: 'Placeholder' }),
      });
      const button = component.getByRole('button');
      await button.click({ force: true });

      await expect(button).toBeDisabled();
      await expect.poll(() => component.getSpyValue('onClick')).toEqual([]);
    });
  });
});
```

#### Opening Test Report

After running Playwright tests, test report can be served by using
the following command:

```bash
npm run test:playwright-ct:show-report
```

Then open the displayed URL (typically `http://localhost:9323`)
in your browser. Please note that the test report is only available
if the tests were run prior to serving the report.

[playwright-cli]: https://playwright.dev/docs/test-cli#reference
