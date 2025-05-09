import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Alert } from '../../../components/Alert/index.ts';
import { ScrollView } from '../../../components/ScrollView/index.ts';
import TranslationsProvider from '../TranslationsProvider.tsx';

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
