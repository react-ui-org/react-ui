import React from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import { MenuButton } from '../MenuButton';

describe('rendering', () => {
  it('renders correctly mandatory props only', () => {
    const tree = shallow(<MenuButton
      buttons={[
        {
          label: 'Action',
        },
      ]}
      label="More options"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow(<MenuButton
      afterLabel={<span className="icon" />}
      beforeLabel={<span className="icon" />}
      buttons={[
        {
          label: 'Action',
        },
      ]}
      clickHandler={() => {}}
      disabled
      id="custom-id"
      label="More options"
      loadingIcon={<span className="icon" />}
      priority="flat"
      size="large"
      variant="success"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props inside of buttons prop', () => {
    const tree = shallow(<MenuButton
      buttons={[
        {
          afterLabel: <span className="icon" />,
          beforeLabel: <span className="icon" />,
          clickHandler: () => {},
          disabled: true,
          id: 'custom-action-id',
          label: 'Action',
          loadingIcon: <span className="icon" />,
          type: 'button',
          variant: 'danger',
        },
      ]}
      label="More options"
    />);

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls clickHandler() on click', () => {
    const spy = sinon.spy();
    const component = mount(<MenuButton
      buttons={[]}
      clickHandler={spy}
      label="label"
    />);

    component.simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});
