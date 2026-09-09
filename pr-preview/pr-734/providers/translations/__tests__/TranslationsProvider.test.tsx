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

    const rootElement = dom.container.firstChild as HTMLElement;

    expect(within(rootElement).getByTitle('Zavřít'));
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

    const rootElement = dom.container.firstChild as HTMLElement;

    expect(within(rootElement).getByTitle('Předchozí'));
    expect(within(rootElement).getByTitle('Siguiente'));
  });
});
