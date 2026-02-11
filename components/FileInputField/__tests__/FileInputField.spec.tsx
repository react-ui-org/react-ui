import React from 'react';
import {
  expect,
  test,
} from '@playwright/experimental-ct-react';
import {
  mixPropTests,
  propTests,
} from '../../../../tests/playwright';
import type { FileInputFieldForFormLayoutTestsProps } from './FileInputField.story';
import {
  FileInputFieldForFormLayoutTests,
  FileInputFieldForRefTest,
  FileInputFieldForTest,
  FileInputFieldWithResetButtonForTest,
} from './FileInputField.story';
import { fileSelectedPropTest } from './_propTests/fileSelectedPropTest';

test.describe('FileInputField', () => {
  test.describe('base', () => {
    test.describe('visual', () => {
      [
        ...propTests.defaultComponentPropTest,
        ...mixPropTests([
          propTests.disabledPropTest,
          propTests.validationStatePropTest,
        ]),
        ...fileSelectedPropTest,
        ...mixPropTests([
          propTests.fullWidthPropTest,
          propTests.layoutPropTest,
        ]),
        ...propTests.helpTextAndValidationTextPropType,
        ...propTests.helpTextPropTest,
        ...propTests.isLabelVisiblePropTest,
        ...propTests.labelPropTest,
        ...propTests.requiredPropTest,
        ...propTests.sizePropTest,
        ...propTests.validationTextPropTest,
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
            <FileInputFieldForTest
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
      test('id', async ({ mount }) => {
        const testId = 'testId';
        const testLabel = 'testLabel';
        const helpText = 'helpText';
        const validationText = 'validationText';

        const component = await mount(
          <FileInputFieldForTest
            helpText={helpText}
            id={testId}
            label={testLabel}
            validationText={validationText}
          />,
        );

        expect(component.locator(`div[id="${testId}__root"]`)).toBeDefined();
        await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
        await expect(component.locator('input[type="file"]')).toHaveAttribute('id', testId);
        await expect(component.getByText(helpText)).toHaveAttribute('id', `${testId}__helpText`);
        await expect(component.getByText(validationText)).toHaveAttribute('id', `${testId}__validationText`);
      });

      test('ref', async ({ mount }) => {
        const component = await mount(
          <FileInputFieldForRefTest
            testRefAttrName="test-ref"
            testRefAttrValue="test-ref-value"
          />,
        );

        await expect(component.locator('input[type="file"]')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('Call onFilesChanged callback when file upload.', async ({ mount }) => {
        let called = false;

        const component = await mount(
          <FileInputFieldForTest
            onFilesChanged={() => {
              called = true;
            }}
          />,
        );

        const virtualFile = {
          buffer: Buffer.from('This is test file.'),
          mimeType: 'text/plain',
          name: 'testfile.txt',
        };

        const inputField = component.locator('input[type="file"]');
        await inputField.setInputFiles(virtualFile);

        expect(called).toBe(true);
      });

      test('Call onFilesChanged callback when no file is selected.', async ({ mount }) => {
        let called = false;
        let calledWith: FileList | null = null;

        const component = await mount(
          <FileInputFieldForTest
            onFilesChanged={(files: FileList) => {
              called = true;
              calledWith = files;
            }}
          />,
        );

        const inputField = component.locator('input[type="file"]');
        await inputField.setInputFiles([]);

        expect(called).toBe(true);
        expect(calledWith).toStrictEqual([]);
      });

      test('Call onFilesChanged callback when file drag and drop into field.', async ({
        mount,
        page,
      }) => {
        const id = 'dropzoneId';
        let called = false;

        const component = await mount(
          <FileInputFieldForTest
            id={id}
            onFilesChanged={() => {
              called = true;
            }}
          />,
        );

        const fileName = 'newFile.txt';
        const fileContent = 'This is a test file';

        const dataTransfer = await page.evaluateHandle(({
          name,
          content,
        }) => {
          const dt = new DataTransfer();
          const file = new File(
            [content],
            name,
            { type: 'text/plain' },
          );
          dt.items.add(file);
          return dt;
        }, {
          content: fileContent,
          name: fileName,
        });

        const dropZone = component.locator(`div[id="${id}__root"]`);

        await dropZone.dispatchEvent('dragenter', { dataTransfer });
        await dropZone.dispatchEvent('drop', { dataTransfer });

        expect(called).toBe(true);
      });

      test('Can upload multiple files.', async ({ mount }) => {
        let listLength = 0;

        const component = await mount(
          <FileInputFieldForTest
            multiple
            onFilesChanged={(files: FileList) => {
              listLength = Object.keys(files).length;
            }}
          />,
        );

        const virtualFile1 = {
          buffer: Buffer.from('This is test file.'),
          mimeType: 'text/plain',
          name: 'testfile.txt',
        };

        const virtualFile2 = {
          buffer: Buffer.from('This is another test file.'),
          mimeType: 'text/plain',
          name: 'testfile.txt',
        };

        const inputField = component.locator('input[type="file"]');
        await inputField.setInputFiles([
          virtualFile1,
          virtualFile2,
        ]);

        expect(listLength).toBe(2);
      });

      test('Can upload multiple files via drag and drop.', async ({
        mount,
        page,
      }) => {
        const id = 'dropzoneId';
        let numberOfCalls = 0;

        const component = await mount(
          <FileInputFieldForTest
            id={id}
            multiple
            onFilesChanged={() => {
              numberOfCalls += 1;
            }}
          />,
        );

        const fileName1 = 'newFile1.txt';
        const fileContent1 = 'This is a test file';

        const dataTransfer1 = await page.evaluateHandle(({
          name,
          content,
        }) => {
          const dt = new DataTransfer();
          const file = new File([content], name, { type: 'text/plain' });
          dt.items.add(file);
          return dt;
        }, {
          content: fileContent1,
          name: fileName1,
        });

        const fileName2 = 'newFile2.txt';
        const fileContent2 = 'This another is a test file';

        const dataTransfer2 = await page.evaluateHandle(({
          name,
          content,
        }) => {
          const dt = new DataTransfer();
          const file = new File([content], name, { type: 'text/plain' });
          dt.items.add(file);
          return dt;
        }, {
          content: fileContent2,
          name: fileName2,
        });

        const dropZone = component.locator(`div[id="${id}__root"]`);

        await dropZone.dispatchEvent('dragenter', { dataTransfer: dataTransfer1 });
        await dropZone.dispatchEvent('drop', { dataTransfer: dataTransfer1 });
        await page.waitForTimeout(1000);
        await dropZone.dispatchEvent('dragenter', { dataTransfer: dataTransfer2 });
        await dropZone.dispatchEvent('drop', { dataTransfer: dataTransfer2 });

        expect(numberOfCalls).toBe(2);
      });

      test('Able to reset selected file.', async ({ mount }) => {
        let keyLength;

        const component = await mount(
          <FileInputFieldWithResetButtonForTest
            onFilesChanged={(files: FileList) => {
              keyLength = Object.keys(files).length;
            }}
          />,
        );

        const virtualFile = {
          buffer: Buffer.from('This is test file.'),
          mimeType: 'text/plain',
          name: 'testfile.txt',
        };

        const inputField = component.locator('input[type="file"]');
        const resetButton = component.getByText('Reset');

        await inputField.setInputFiles(virtualFile);
        expect(keyLength).toBe(1);

        await resetButton.click();
        expect(keyLength).toBe(0);
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      [
        ...propTests.layoutPropTest,
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
            <FileInputFieldForFormLayoutTests
              {...props as unknown as FileInputFieldForFormLayoutTestsProps}
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
  });
});
