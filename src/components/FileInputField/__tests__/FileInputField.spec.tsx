import {
  expect,
  mixPropTests,
  propTests,
  test,
} from '../../../../tests/playwright';
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

          const component = await mount('FileInputField/FileInputFieldForTest', props);

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

        const component = await mount('FileInputField/FileInputFieldForTest', {
          helpText,
          id: testId,
          label: testLabel,
          validationText,
        });

        expect(component.locator(`div[id="${testId}__root"]`)).toBeDefined();
        await expect(component.getByText(testLabel)).toHaveAttribute('id', `${testId}__labelText`);
        await expect(component.locator('input[type="file"]')).toHaveAttribute('id', testId);
        await expect(component.getByText(helpText)).toHaveAttribute('id', `${testId}__helpText`);
        await expect(component.getByText(validationText)).toHaveAttribute('id', `${testId}__validationText`);
      });

      test('ref', async ({ mount }) => {
        const component = await mount('FileInputField/FileInputFieldForRefTest', {
          testRefAttrName: 'test-ref',
          testRefAttrValue: 'test-ref-value',
        });

        await expect(component.locator('input[type="file"]')).toHaveAttribute('test-ref', 'test-ref-value');
      });
    });

    test.describe('functionality', () => {
      test('Call onFilesChanged callback when file upload.', async ({ mount }) => {
        const component = await mount('FileInputField/FileInputFieldSpyForTest');

        const virtualFile = {
          buffer: Buffer.from('This is test file.'),
          mimeType: 'text/plain',
          name: 'testfile.txt',
        };

        const inputField = component.locator('input[type="file"]');
        await inputField.setInputFiles(virtualFile);

        await expect.poll(() => component.getSpyValue('onFilesChanged')).toEqual([['testfile.txt']]);
      });

      test('Call onFilesChanged callback when no file is selected.', async ({ mount }) => {
        const component = await mount('FileInputField/FileInputFieldSpyForTest');

        const inputField = component.locator('input[type="file"]');
        await inputField.setInputFiles([]);

        await expect.poll(() => component.getSpyValue('onFilesChanged')).toEqual([[]]);
      });

      test('Call onFilesChanged callback when file drag and drop into field.', async ({
        mount,
        page,
      }) => {
        const id = 'dropzoneId';

        const component = await mount('FileInputField/FileInputFieldSpyForTest', {
          id,
        });

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

        await expect.poll(() => component.getSpyValue('onFilesChanged')).toEqual([[fileName]]);
      });

      test('Can upload multiple files.', async ({ mount }) => {
        const component = await mount('FileInputField/FileInputFieldSpyForTest', {
          multiple: true,
        });

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

        await expect.poll(() => component.getSpyValue('onFilesChanged')).toEqual([['testfile.txt', 'testfile.txt']]);
      });

      test('Can upload multiple files via drag and drop.', async ({
        mount,
        page,
      }) => {
        const id = 'dropzoneId';

        const component = await mount('FileInputField/FileInputFieldSpyForTest', {
          id,
          multiple: true,
        });

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

        await expect.poll(async () => (await component.getSpyValue('onFilesChanged')).length).toBe(2);
      });

      test('Able to reset selected file.', async ({ mount }) => {
        const component = await mount('FileInputField/FileInputFieldWithResetButtonSpyForTest');

        const virtualFile = {
          buffer: Buffer.from('This is test file.'),
          mimeType: 'text/plain',
          name: 'testfile.txt',
        };

        const inputField = component.locator('input[type="file"]');
        const resetButton = component.getByText('Reset');

        await inputField.setInputFiles(virtualFile);
        await expect.poll(async () => (await component.getSpyValue('onFilesChanged')).at(-1)).toEqual(['testfile.txt']);

        await resetButton.click();
        await expect.poll(async () => (await component.getSpyValue('onFilesChanged')).at(-1)).toEqual([]);
      });
    });
  });

  test.describe('formLayout', () => {
    test.describe('visual', () => {
      test('labelWidth:string=100px', async ({ mount }) => {
        const component = await mount('FileInputField/FileInputFieldForFormLayoutLabelWidthTests');

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });

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

          const component = await mount('FileInputField/FileInputFieldForFormLayoutTests', props);

          if (onBeforeSnapshot) {
            await onBeforeSnapshot(page, component);
          }

          const screenshot = await component.screenshot();
          expect(screenshot).toMatchSnapshot();
        });
      });
    });
  });

  test.describe('formLayoutCustomField', () => {
    test.describe('visual', () => {
      test('label:hidden', async ({ mount }) => {
        const component = await mount('FileInputField/FileInputFieldForFormLayoutCustomFieldTests');

        const screenshot = await component.screenshot();
        expect(screenshot).toMatchSnapshot();
      });
    });
  });
});
