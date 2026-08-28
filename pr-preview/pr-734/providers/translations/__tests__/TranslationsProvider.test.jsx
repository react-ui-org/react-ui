import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Alert } from '../../../components/Alert';
import { ScrollView } from '../../../components/ScrollView';
import TranslationsProvider from '../TranslationsProvider';

describe('rendering', () => {
  it('renders with translations', () => {
    const dom = render((
      <TranslationsProvider
        translations={{
          Alert: { close: 'Zavřít' },
        }}
      >
        <Alert onClose={() => {}}>alert text</Alert>
      </TranslationsProvider>

    ));

    expect(within(dom.container.firstChild).getByTitle('Zavřít'));
  });

  it('renders with nested translations', () => {
    const dom = render((
      <TranslationsProvider
        translations={{
          ScrollView: {
            next: 'Další',
            previous: 'Předchozí',
          },
        }}
      >
        <TranslationsProvider
          translations={{
            ScrollView: { next: 'Siguiente' },
          }}
        >
          <ScrollView arrows>some scrolable text</ScrollView>
        </TranslationsProvider>
      </TranslationsProvider>

    ));

    expect(within(dom.container.firstChild).getByTitle('Předchozí'));
    expect(within(dom.container.firstChild).getByTitle('Siguiente'));
  });
});
