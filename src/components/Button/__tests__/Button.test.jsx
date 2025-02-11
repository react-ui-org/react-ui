import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { actionColorPropTest } from '../../../../tests/jest/propTests/actionColorPropTest';
import { blockPropTest } from '../../../../tests/jest/propTests/blockPropTest';
import { feedbackColorPropTest } from '../../../../tests/jest/propTests/feedbackColorPropTest';
import { neutralColorPropTest } from '../../../../tests/jest/propTests/neutralColorPropTest';
import { refPropTest } from '../../../../tests/jest/propTests/refPropTest';
import { labelPropTest } from '../../../../tests/jest/propTests/labelPropTest';
import { sizePropTest } from '../../../../tests/jest/propTests/sizePropTest';
import { ButtonGroupContext } from '../../ButtonGroup';
import { Button } from '../Button';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  it.each([
    ...blockPropTest,
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toBeDisabled(),
    ],
    [
      { disabled: false },
      (rootElement) => expect(rootElement).not.toBeDisabled(),
    ],
    [
      { priority: 'filled' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityFilled'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityOutline'),
    ],
    [
      { priority: 'flat' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityFlat'),
    ],
    ...sizePropTest,
  ])('renders with ButtonGroup props: "%s"', (testedProps, assert) => {
    const dom = render((
      <ButtonGroupContext.Provider
        value={{ ...testedProps }}
      >
        <Button
          {...mandatoryProps}
        />
      </ButtonGroupContext.Provider>
    ));

    assert(dom.container.firstChild);
  });

  it.each([
    [
      { afterLabel: <div>after label</div> },
      (rootElement) => expect(within(rootElement).getByText('after label')),
    ],
    [
      { beforeLabel: <div>before label</div> },
      (rootElement) => expect(within(rootElement).getByText('before label')),
    ],
    ...actionColorPropTest,
    ...blockPropTest,
    ...feedbackColorPropTest,
    ...neutralColorPropTest,
    [
      { disabled: true },
      (rootElement) => expect(rootElement).toBeDisabled(),
    ],
    [
      { disabled: false },
      (rootElement) => expect(rootElement).not.toBeDisabled(),
    ],
    [
      { endCorner: <div>corner text</div> },
      (rootElement) => expect(within(rootElement).getByText('corner text')),
    ],
    ...refPropTest(React.createRef()),
    [
      { id: 'id' },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
      },
    ],
    ...labelPropTest(),
    [
      { labelVisibility: 'sm' },
      (rootElement) => expect(rootElement).toHaveClass('hasLabelVisibleSm'),
    ],
    [
      { labelVisibility: 'md' },
      (rootElement) => expect(rootElement).toHaveClass('hasLabelVisibleMd'),
    ],
    [
      { labelVisibility: 'lg' },
      (rootElement) => expect(rootElement).toHaveClass('hasLabelVisibleLg'),
    ],
    [
      { labelVisibility: 'xl' },
      (rootElement) => expect(rootElement).toHaveClass('hasLabelVisibleXl'),
    ],
    [
      { labelVisibility: 'x2l' },
      (rootElement) => expect(rootElement).toHaveClass('hasLabelVisibleX2l'),
    ],
    [
      { labelVisibility: 'x3l' },
      (rootElement) => expect(rootElement).toHaveClass('hasLabelVisibleX3l'),
    ],
    [
      { labelVisibility: 'none' },
      (rootElement) => expect(rootElement).toHaveClass('hasLabelHidden'),
    ],
    [
      { feedbackIcon: <div>feedback icon</div> },
      (rootElement) => {
        expect(within(rootElement).getByText('feedback icon'));
        expect(rootElement).toBeDisabled();
        expect(rootElement).toHaveClass('hasRootFeedback');
      },
    ],
    [
      { priority: 'filled' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityFilled'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityOutline'),
    ],
    [
      { priority: 'flat' },
      (rootElement) => expect(rootElement).toHaveClass('isRootPriorityFlat'),
    ],
    ...sizePropTest,
    [
      { startCorner: <div>corner text</div> },
      (rootElement) => expect(within(rootElement).getByText('corner text')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <Button
        {...mandatoryProps}
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});

describe('functionality', () => {
  it('calls synthetic event onClick()', async () => {
    const spy = jest.fn();
    render((
      <Button
        {...mandatoryProps}
        onClick={spy}
      />
    ));

    await userEvent.click(screen.getByText('label'));
    expect(spy).toHaveBeenCalled();
  });
});
