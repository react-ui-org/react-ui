import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Badge } from '../../../components/Badge';
import { Grid } from '../../../components/Grid';
import GlobalPropsProvider from '../GlobalPropsProvider';

describe('rendering', () => {
  it('renders with global props', () => {
    const dom = render((
      <GlobalPropsProvider
        globalProps={{
          Badge: { label: 'label' },
        }}
      >
        {/* @ts-expect-error The required `label` prop is supplied by the global props. */}
        <Badge />
      </GlobalPropsProvider>
    ));

    const rootElement = dom.container.firstChild as HTMLElement;

    expect(within(rootElement).getByText('label'));
  });

  it('renders with nested providers and object typed props', () => {
    const dom = render((
      <GlobalPropsProvider
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
        <GlobalPropsProvider
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
          <GlobalPropsProvider
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
          </GlobalPropsProvider>
        </GlobalPropsProvider>
      </GlobalPropsProvider>
    ));

    const rootElement = dom.container.firstChild as HTMLElement;

    // Assert alignContent
    expect(rootElement.style.cssText.includes('--rui-local-align-content')).toBeFalsy();

    // Assert autoFlow
    expect(rootElement.style.cssText.includes('--rui-local-auto-flow-lg: column')).toBeTruthy();
    expect(rootElement.style.cssText.includes('--rui-local-auto-flow-md: column')).toBeTruthy();
    expect(rootElement.style.cssText.includes('--rui-local-auto-flow-sm')).toBeFalsy();
    expect(rootElement.style.cssText.includes('--rui-local-auto-flow-xs: row dense')).toBeTruthy();

    // Assert justifyContent
    expect(rootElement.style.cssText.includes('--rui-local-justify-content-xs: center;')).toBeTruthy();

    // Assert justifyItems
    expect(rootElement.style.cssText.includes('--rui-local-justify-items')).toBeFalsy();

    // Assert tag
    expect(rootElement.tagName).toEqual('SECTION');
  });
});

