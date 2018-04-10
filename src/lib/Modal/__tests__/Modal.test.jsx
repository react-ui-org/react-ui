import React from 'react';
import {
  mount,
  shallow,
} from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import Modal from '../index';

jest.mock('../../Icon/load-material-design-icons');

describe('rendering', () => {
  it('renders correctly with mandatory props only', () => {
    const tree = shallow((
      <Modal
        closeHandler={() => {}}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props', () => {
    const tree = shallow((
      <Modal
        actions={[
          {
            clickHandler: () => {},
            label: 'Action',
          },
        ]}
        closeHandler={() => {}}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls closeHandler() on Close button click', () => {
    const spy = sinon.spy();
    const component = mount((
      <Modal
        closeHandler={spy}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    component.find('Button').simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});

