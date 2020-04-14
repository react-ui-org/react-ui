import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import Modal from '..';

describe('rendering', () => {
  it('renders correctly with mandatory props only', () => {
    const tree = mount((
      <Modal
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props except translations', () => {
    const tree = mount((
      <Modal
        actions={[
          {
            clickHandler: () => {},
            label: 'Action',
          },
        ]}
        closeHandler={() => {}}
        id="custom-id"
        size="large"
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with all props except translations and with a loading icon', () => {
    const tree = mount((
      <Modal
        actions={[
          {
            clickHandler: () => {},
            label: 'Action',
            loadingIcon: <span className="icon" />,
          },
        ]}
        closeHandler={() => {}}
        id="custom-id"
        size="small"
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders correctly with translations', () => {
    const tree = mount((
      <Modal
        closeHandler={() => {}}
        title="Modal title"
        translations={{ close: 'Zavřít' }}
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

    component.find('button').at(0).simulate('click');
    component.find('Button').at(0).simulate('click');
    expect(spy.calledTwice).toEqual(true);
  });
});

