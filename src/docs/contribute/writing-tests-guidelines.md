# Playwright Testing Structure

This document outlines the structure and guidelines for writing Playwright
tests, ensuring consistency and maintainability throughout the codebase.

## Folder Structure

Playwright tests are organized into multiple files and folders, each
serving a specific purpose.

The complete component structure should be as follows:

```text
<ComponentName>/
├── __tests__/
│   ├── <ComponentName>.spec.tsx-snapshots/
│   ├── _propTests/
│   │   ├── <propTestName>.ts
│   ├── <ComponentName>.spec.tsx
│   ├── <ComponentName>.story.tsx
├── ...rest component files
```

- `<ComponentName>` - Root folder of the component, named after
the component itself.
- `<propTestName>.ts` - Defines local test property combinations used only
within the context of the tested component. Global tests shared across
the project are located in `tests/playwright/propTests`.
- `<ComponentName>.spec.tsx` - Contains all tests, structured as
described below.
- `<ComponentName>.story.tsx` - Includes all component definitions used
in tests. These components should be functional without requiring any
properties to be passed from the tests.

## File Structure of `<ComponentName>.spec.tsx`

Playwright tests follow a structured format to ensure readability
and scalability. Each displayed level represents a `test.describe(...)` block.
The structure consists of:

```text
<ComponentName>/
├── base/
│   ├── visual/
│   │   ├── fullPage/
│   ├── non-visual/
│   ├── functionality/
├── formLayout/
│   ├── visual/
│   ├── non-visual/
│   ├── functionality/
```

- `<ComponentName>` - Groups all tests for the tested component.
- `base` - Contains component tests without any additional layout.
- `visual` - Tests that compare the component state against snapshots.
- `fullPage` - Subgroup of visual tests that must be performed
on a full-scale page.
- `non-visual` - Validates non-functional properties (e.g., `id` or `ref`).
- `functionality` - Validates properties that affect the component's behavior
(e.g., `onChange`).
- `formLayout` - Contains tests for the component wrapped in `<FormLayout/>`.

Test block categories can be expanded or removed depending on the nature
of the tested component and whether a predefined test block is applicable
in a specific case.

## File Structure of `<ComponentName>.story.tsx`

The `<ComponentName>.story.tsx` file should include all component variants
tested in `<ComponentName>.spec.tsx`. Components should be organized
in the following order:

1. Component for normal tests (`<ComponentName>ForTest`)
2. Component for `ref` attribute tests (`<ComponentName>ForRefTest`)
3. Component for layout tests (`<ComponentName>ForLayoutTest`)
4. Components for other type of tests that follow conventions above.

## Anatomy of Test Case

Each test case should follow the properties defined in the `PropTest` type.
This type includes the properties `name`, `onBeforeTest`, `onBeforeSnapshot`,
and `props`, which define the component setup for the actual test case.

- `name` - The name of the test case, following the naming conventions
described in the next chapter.
- `onBeforeTest` - A function called before the test and component render.
  It should perform any environment tweaks necessary for the defined test.
- `onBeforeSnapshot` - A function called after the component is rendered
and before its comparison against the snapshot.
- `props` - The properties passed to the component in the defined
test scenario.

## Formatting and Code Style

### Rules

- Test for the default component properties should always be placed first.
This test is always represented by `propTests.defaultComponentPropTest`,
defined in the global `propTests`.

- When possible, try to re-use globally defined `propTests`
for visual tests, located in `tests/playwright/propTests`.

- It is essential to test all combinations of props that have a significant
visual impact on the appearance of the component.

- For all possible combinations of multiple `propTests` should be used
function `mixPropTests`.

### Format

- Prop test variants should be sorted alphabetically. If there are multiple
prop tests like `feedbackColor`, `neutralColor`, etc., they should still be
ordered alphabetically under the category of color.

  ```jsx
  test.describe('blockName', () => {
    [
      ...propTests.aPropTest,
      ...propTests.bPropTest,
      ...propTests.cPropTest,
    ].forEach(({
      name,
      onBeforeTest,
      onBeforeSnapshot,
      props,
    }) => {
      // Rest of test setup.
    });
  });

  ```

- Naming convention for propTests `name` property should follow this pattern:

  ```text
    someProp:string
    someProp:bool=true
    someProp:bool=false
    someProp:shape[flat]
    someProp:shape[nested]
  ```

## Templates

### Template for `<ComponentName>.story.tsx`

```tsx
import React from 'react';
import type { HTMLAttributes } from 'react';
import { ComponentName } from '..';

// Types for story component will be improved when we have full TypeScript support
type ComponentForTestProps = HTMLAttributes<HTMLDivElement>;
type ComponentForRefTestProps = ComponentForTestProps & {
    testRefAttrName: string;
    testRefAttrValue: string;
};

export const ComponentForTest = ({
    ...props
} : ComponentForTestProps) => (
    <ComponentName
        requiredPropA="value-a"
        requiredPropB="value-b"
        {...props}
    />
);

// Story for `ref` prop, if applicable
export const ComponentForRefTest = ({
    testRefAttrName,
    testRefAttrValue,
    ...props
} : ComponentForRefTestProps) => {
    const ref = useRef<HTMLDivElement>(undefined);

    useEffect(() => {
        ref.current?.setAttribute(testRefAttrName, testRefAttrValue);
    }, [testRefAttrName, testRefAttrValue]);

    return (
        <Component
            {...props}
            ref={ref}
        />
    );
};

```

### Template for `<ComponentName>.spec.tsx`

```tsx
import React from 'react';
import {
    expect,
    test,
} from '@playwright/experimental-ct-react';
import { propTests } from '../../../../tests/playwright';
import { ComponentNameForTest } from './ComponentName.story';

test.describe('ComponentName', () => {
    test.describe('base', () => {
        test.describe('visual', () => {
            [
                ...propTests.defaultComponentPropTest,
                // ...propTests.propTestA,
                // ...mixPropTests([
                //    ...propTests.propTestX,
                //    ...propTests.propTestY,
                // ]),
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

                    const component = await mount(
                        <ComponentNameForTest
                            {...props}
                        />,
                    );

                    if (onBeforeSnapshot) {
                        await onBeforeSnapshot(page, component);
                    }

                    const screenshot = await component.screenshot();
                    expect(screenshot).toMatchSnapshot();
                });
            });
        });

        test.describe('non-visual', () => {
            // Test for `id` prop, if applicable
            test('id', async ({ mount }) => {
                const component = await mount(
                    <ComponentForTest
                        id="test-id"
                    />,
                );

                await expect(component).toHaveAttribute('id', 'test-id');
                // Test the rest of internal IDs
            });

            // Test for `ref` prop, if applicable
            test('ref', async ({ mount }) => {
                const component = await mount(
                    <ComponentForRefTest
                        testRefAttrName="test-ref"
                        testRefAttrValue="test-ref-value"
                    />,
                );

                await expect(component).toHaveAttribute('test-ref', 'test-ref-value');
            });

            // Other non-visual tests
        });

        test.describe('functionality', () => {
            // Functional tests
        });
    });

    test.describe('formLayout', () => {
        test.describe('visual', () => {
            // Visual tests as in `base` block
        });

        test.describe('non-visual', () => {
            // Non-visual tests as in `base` block
        });

        test.describe('functionality', () => {
            // Functional tests as in `base` block
        });
    });
});
```
