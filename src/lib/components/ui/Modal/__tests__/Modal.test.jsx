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
        disableBodyScrolling
        id="custom-id"
        scrollViewEndShadow={{ background: 'none' }}
        scrollViewStartShadow={{ background: 'none' }}
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
        disableBodyScrolling
        id="custom-id"
        scrollViewEndShadow={{ background: 'none' }}
        scrollViewShadowSize="30px"
        scrollViewStartShadow={{ background: 'none' }}
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

  it('renders correctly with portal id', () => {
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'app-modal-portal');

    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    const tree = mount((
      <Modal
        portalId="app-modal-portal"
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('call closeHandler() on Close button click', () => {
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

  it('call closeHandler() when Escape is pressed', () => {
    const spy = sinon.spy();
    mount((
      <Modal
        closeHandler={spy}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    document.dispatchEvent(event);

    expect(spy.calledOnce).toEqual(true);
  });

  it('call submit action when Enter is pressed', () => {
    const submitSpy = sinon.spy();

    const component = mount((
      <Modal
        actions={[
          {
            clickHandler: submitSpy,
            id: 'submitButton',
            label: 'submit',
            type: 'submit',
          },
        ]}
        closeHandler={() => {}}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    component.find('button').at(1).simulate('click');

    expect(submitSpy.calledOnce).toEqual(true);
  });

  it('call submit action when Enter is pressed', () => {
    const submitSpy = sinon.spy();
    const otherSpy = sinon.spy();

    mount((
      <Modal
        actions={[
          {
            clickHandler: otherSpy,
            id: 'otherButton',
            label: 'other',
          },
          {
            clickHandler: submitSpy,
            id: 'submitButton',
            label: 'submit',
            type: 'submit',
          },
        ]}
        closeHandler={() => {}}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    document.dispatchEvent(event);

    expect(submitSpy.calledOnce).toEqual(true);
    expect(otherSpy.notCalled).toEqual(true);
  });

  it('do not call submit action when submit action is disabled and Enter is clicked', () => {
    const submitSpy = sinon.spy();

    mount((
      <Modal
        actions={[
          {
            clickHandler: submitSpy,
            disabled: true,
            id: 'submitButton',
            label: 'submit',
            type: 'submit',
          },
        ]}
        closeHandler={() => {}}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    document.dispatchEvent(event);

    expect(submitSpy.notCalled).toEqual(true);
  });

  it('do not call submit action when submit action is not present and Enter is clicked', () => {
    const otherSpy = sinon.spy();

    mount((
      <Modal
        actions={[
          {
            clickHandler: otherSpy,
            id: 'otherButton',
            label: 'other',
          },
        ]}
        closeHandler={() => {}}
        title="Modal title"
      >
        Modal content
      </Modal>
    ));

    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    document.dispatchEvent(event);

    expect(otherSpy.notCalled).toEqual(true);
  });
});
