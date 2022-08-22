import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { colorPropTest } from '../../../../../tests/propTests/colorPropTest';
import { refPropTest } from '../../../../../tests/propTests/refPropTest';
import { labelPropTest } from '../../../../../tests/propTests/labelPropTest';
import { sizePropTest } from '../../../../../tests/propTests/sizePropTest';
import { ButtonGroupContext } from '../../ButtonGroup';
import { Button } from '../Button';

const mandatoryProps = {
  label: 'label',
};

describe('rendering', () => {
  it.each([
    [
      { block: true },
      (rootElement) => expect(rootElement).toHaveClass('rootBlock'),
    ],
    [
      { block: false },
      (rootElement) => expect(rootElement).not.toHaveClass('rootBlock'),
    ],
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
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityFilled'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityOutline'),
    ],
    [
      { priority: 'flat' },
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityFlat'),
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
    [
      { block: true },
      (rootElement) => expect(rootElement).toHaveClass('rootBlock'),
    ],
    [
      { block: false },
      (rootElement) => expect(rootElement).not.toHaveClass('rootBlock'),
    ],
    ...colorPropTest,
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
    ...labelPropTest,
    [
      { labelVisibility: 'sm' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelVisibleSm'),
    ],
    [
      { labelVisibility: 'md' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelVisibleMd'),
    ],
    [
      { labelVisibility: 'lg' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelVisibleLg'),
    ],
    [
      { labelVisibility: 'xl' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelVisibleXl'),
    ],
    [
      { labelVisibility: 'x2l' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelVisibleX2l'),
    ],
    [
      { labelVisibility: 'x3l' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelVisibleX3l'),
    ],
    [
      { labelVisibility: 'none' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelHidden'),
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
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityFilled'),
    ],
    [
      { priority: 'outline' },
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityOutline'),
    ],
    [
      { priority: 'flat' },
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityFlat'),
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
  it('calls synthetic event onClick()', () => {
    const spy = sinon.spy();
    render((
      <Button
        {...mandatoryProps}
        onClick={spy}
      />
    ));

    userEvent.click(screen.getByText('label'));
    expect(spy.calledOnce).toEqual(true);
  });
});
