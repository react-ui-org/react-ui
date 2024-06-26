import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Alert } from '../../components/Alert';
import { Badge } from '../../components/Badge';
import { Grid } from '../../components/Grid';
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

  it('renders with nested providers', () => {
    const dom = render((
      <RUIProvider
        globalProps={{
          Grid: {
            alignContent: {
              sm: 'column',
              xs: 'row dense',
            },
            autoFlow: {
              sm: 'column',
              xs: 'row dense',
            },
            justifyItems: 'center',
            tag: 'main',
          },
        }}
      >
        <RUIProvider
          globalProps={{
            Grid: {
              alignContent: undefined,
              autoFlow: {
                lg: 'column',
                sm: undefined,
                xs: 'row dense',
              },
              justifyContent: undefined,
              justifyItems: undefined,
              tag: 'section',
            },
          }}
        >
          <RUIProvider
            globalProps={{
              Grid: {
                autoFlow: {
                  md: 'column',
                },
                justifyContent: 'center',
              },
            }}
          >
            <Grid>
              <div>
                Content text
              </div>
            </Grid>
          </RUIProvider>
        </RUIProvider>
      </RUIProvider>
    ));

    // Assert alignContent
    expect(dom.container.firstChild.style.cssText.includes('--rui-local-align-content')).toBeFalsy();

    // Assert autoFlow
    expect(dom.container.firstChild.style.cssText.includes('--rui-local-auto-flow-lg: column')).toBeTruthy();
    expect(dom.container.firstChild.style.cssText.includes('--rui-local-auto-flow-md: column')).toBeTruthy();
    expect(dom.container.firstChild.style.cssText.includes('--rui-local-auto-flow-sm')).toBeFalsy();
    expect(dom.container.firstChild.style.cssText.includes('--rui-local-auto-flow-xs: row dense')).toBeTruthy();

    // Assert justifyContent
    expect(dom.container.firstChild.style.cssText.includes('--rui-local-justify-content-xs: center;')).toBeTruthy();

    // Assert justifyItems
    expect(dom.container.firstChild.style.cssText.includes('--rui-local-justify-items')).toBeFalsy();

    // Assert tag
    expect(dom.container.firstChild.tagName).toEqual('SECTION');
  });
});

