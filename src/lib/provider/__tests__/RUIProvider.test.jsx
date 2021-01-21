import React from 'react';
import { mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Modal from '../../components/ui/Modal';
import { RUIProvider } from '..';

describe('rendering', () => {
  const translations = {
    Modal: {
      close: 'Zavřít',
    },
    ScrollView: {
      next: 'Další',
      previous: 'Předchozí',
    },
  };

  it('renders component without provider', () => {
    const tree = mount((
      <Modal
        closeHandler={() => {}}
        title="Modal"
      >
        Modal content
      </Modal>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders component with default provider', () => {
    const tree = mount((
      <RUIProvider>
        <Modal
          closeHandler={() => {}}
          title="Modal"
        >
          Modal content
        </Modal>
      </RUIProvider>
    ));
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders component with provided translations', () => {
    const tree = mount((
      <RUIProvider translations={translations}>
        <Modal
          closeHandler={() => {}}
          title="Modal"
        >
          Modal content
        </Modal>
      </RUIProvider>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders component with provided global props', () => {
    const tree = mount((
      <RUIProvider globalProps={{ Modal: { size: 'fullscreen' } }}>
        <Modal
          closeHandler={() => {}}
          title="Modal"
        >
          Modal content
        </Modal>
      </RUIProvider>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it('renders component with provided both translations and global props', () => {
    const tree = mount((
      <RUIProvider
        globalProps={{ Modal: { size: 'fullscreen' } }}
        translations={translations}
      >
        <Modal
          closeHandler={() => {}}
          title="Modal"
        >
          Modal content
        </Modal>
      </RUIProvider>
    ));

    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
