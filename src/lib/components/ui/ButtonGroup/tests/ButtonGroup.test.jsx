import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Button from '../../Button';
import ButtonGroup from '..';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(
      <ButtonGroup>
        <Button label="One" />
        <Button label="Two" />
      </ButtonGroup>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly priority', () => {
    const tree = shallow(
      <ButtonGroup priority="outline">
        <Button label="One" />
        <Button label="Two" />
      </ButtonGroup>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly size', () => {
    const tree = shallow(
      <ButtonGroup size="large">
        <Button label="One" />
        <Button label="Two" />
      </ButtonGroup>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(
      <ButtonGroup
        block
        disabled
        priority="outline"
        size="small"
      >
        <Button label="One" />
        <Button label="Two" />
      </ButtonGroup>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with html element attributes', () => {
    const tree = shallow(
      <ButtonGroup htmlElementAttributes={{ tabIndex: -1 }}>
        <Button label="One" />
        <Button label="Two" />
      </ButtonGroup>,
    );

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
