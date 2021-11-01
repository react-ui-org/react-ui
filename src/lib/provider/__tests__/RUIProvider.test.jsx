import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import Badge from '../../components/Badge';
import Alert from '../../components/Alert';
import RUIProvider from '../RUIProvider';

describe('rendering', () => {
  it.each([
    [
      {
        children: <Badge />,
        globalProps: {
          Badge: { label: 'label' },
        },
      },
      (rootElement) => expect(within(rootElement).getByText('label')),
    ],
    [
      {
        children: <Alert onClose={() => {}}>alert text</Alert>,
        translations: {
          Alert: { close: 'Zavřít' },
        },
      },
      (rootElement) => expect(within(rootElement).getByTitle('Zavřít')),
    ],
  ])('renders with props: "%s"', (testedProps, assert) => {
    const dom = render((
      <RUIProvider
        {...testedProps}
      />
    ));

    assert(dom.container.firstChild);
  });
});
