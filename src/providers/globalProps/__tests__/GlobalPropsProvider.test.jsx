import React from 'react';
import {
  render,
  within,
} from '@testing-library/react';
import { Badge } from '../../../components/Badge/index.ts';
import { Grid } from '../../../components/Grid/index.ts';
import GlobalPropsProvider from '../GlobalPropsProvider.tsx';

describe('rendering', () => {
  it('renders with global props', () => {
    const dom = render((
      <GlobalPropsProvider
        globalProps={{
          Badge: { label: 'label' },
        }}
      >
        <Badge />
      </GlobalPropsProvider>
    ));

    expect(within(dom.container.firstChild).getByText('label'));
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

