import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import sinon from 'sinon';
import userEvent from '@testing-library/user-event';
import { colorPropTest } from '../../../../../../tests/propTests/colorPropTest';
import { labelPropTest } from '../../../../../../tests/propTests/labelPropTest';
import { sizePropTest } from '../../../../../../tests/propTests/sizePropTest';
import { Button } from '../Button';

const mandatoryProps = {
  label: 'label',
};
const ref = React.createRef();

describe('rendering', () => {
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
    [
      {
        forwardedRef: ref,
        id: 'id',
      },
      () => expect(ref.current).toHaveAttribute('id', 'id'),
    ],
    [
      { grouped: true },
      (rootElement) => expect(rootElement).toHaveClass('rootGrouped'),
    ],
    [
      { grouped: false },
      (rootElement) => expect(rootElement).not.toHaveClass('rootGrouped'),
    ],

    [
      { id: 'id' },
      (rootElement) => {
        expect(rootElement).toHaveAttribute('id', 'id');
        expect(within(rootElement).getByText('label')).toHaveAttribute('id', 'id__labelText');
      },
    ],
    ...labelPropTest,
    [
      { labelVisibility: 'all' },
      (rootElement) => {
        expect(rootElement).not.toHaveClass('withLabelHiddenMobile');
        expect(rootElement).not.toHaveClass('withLabelHidden');
      },
    ],
    [
      { labelVisibility: 'desktop' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelHiddenMobile'),
    ],
    [
      { labelVisibility: 'none' },
      (rootElement) => expect(rootElement).toHaveClass('withLabelHidden'),
    ],
    [
      { loadingIcon: <div>loading icon</div> },
      (rootElement) => {
        expect(within(rootElement).getByText('loading icon'));
        expect(rootElement).toBeDisabled();
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
    [
      { priority: 'link' },
      (rootElement) => expect(rootElement).toHaveClass('rootPriorityLink'),
    ],
    ...sizePropTest,
    [
      { startCorner: <div>corner text</div> },
      (rootElement) => expect(within(rootElement).getByText('corner text')),
    ],
    [
      { type: 'button' },
      (rootElement) => expect(rootElement).toHaveAttribute('type', 'button'),
    ],
    [
      { type: 'submit' },
      (rootElement) => expect(rootElement).toHaveAttribute('type', 'submit'),
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
  it('calls clickHandler()', () => {
    const spy = sinon.spy();
    render((
      <Button
        {...mandatoryProps}
        clickHandler={spy}
      />
    ));

    userEvent.click(screen.getByText('label'));
    expect(spy.calledOnce).toEqual(true);
  });
});
